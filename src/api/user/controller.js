import {success} from '../../services/response/';
import {sign} from '../../services/jwt';
import {User} from './../../models/';

export const create = (req, res, next) => {
  const {fullName, email, password} = req.body;
  return User.create({fullName, email, password})
    .then((user) => {
      sign(user.id)
        .then(token => ({token, user: user.view()}))
        .then(success(res, 201));
    })
    .catch((err) => {
      res.status(400).json({
        errors: err.errors,
      });
    });
};
