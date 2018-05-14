import passport from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {jwtSecret} from '../../../config/config';
import {User, Page} from './../../models';

export const password = () => (req, res, next) =>
  passport.authenticate('password', {session: false}, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err);
    } else if (err || !user) {
      return res.status(401).end();
    }
    req.logIn(user, {session: false}, (error) => {
      if (error) return res.status(401).end();
      next();
    });
  })(req, res, next);

export const token = ({required, roles = User.roles} = {}) => (req, res, next) =>
  passport.authenticate('token', {session: false}, (err, user, info) => {
    if (err || (required && !user) || (required && (roles && !~roles.indexOf(user.role)))) {
      return res.status(401).end();
    }
    req.logIn(user, {session: false}, (error) => {
      if (error) return res.status(401).end();
      next(null, user);
    });
  })(req, res, next);

passport.use('password', new BasicStrategy((email, plainPassword, done) => {
  User.findOne({where: {email}}).then((user) => {
    if (!user) {
      done(true);
      return null;
    }
    return user.authenticate(plainPassword, user.password).then((userInstance) => {
      done(null, userInstance);
      return null;
    }).catch(done);
  });
}));

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
}, ({id}, done) => {
  User.findById(id).then((user) => {
    done(null, user);
    return null;
  }).catch(done);
}));
