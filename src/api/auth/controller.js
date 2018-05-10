import { sign } from '../../services/jwt';
import { success } from '../../services/response/';

const login = ({ user }, res, next) =>
  sign(user.id)
    .then(token => ({ token, user }))
    .then(success(res, 201))
    .catch(next);

export default login;
