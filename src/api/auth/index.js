import {Router} from 'express';
import {login, forgotPassword, resetPassword} from './controller';
import {facebookAuthentication, password} from '../../services/passport';

const router = new Router();

router.post('/forgot-password', forgotPassword);

router.put('/forgot-password', resetPassword);

router.post(
  '/',
  password(),
  login,
);

router.post(
  '/facebook/token',
  facebookAuthentication(),
  login,
);

export default router;
