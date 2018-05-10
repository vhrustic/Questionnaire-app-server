import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret, masterKey } from '../../../config/config';
import { User } from './../../models';

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err);
    } else if (err || !user) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (error) => {
      if (error) return res.status(401).end();
      next();
    });
  })(req, res, next);

export const master = () =>
  passport.authenticate('master', { session: false });

export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (error) => {
      if (error) return res.status(401).end();
      next();
    });
  })(req, res, next);

passport.use('password', new BasicStrategy((email, plainPassword, done) => {
  User.findOne({ where: { email } }).then((user) => {
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

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
}));

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
}, ({ id }, done) => {
  User.findById(id).then((user) => {
    done(null, user);
    return null;
  }).catch(done);
}));
