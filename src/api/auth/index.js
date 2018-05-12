import {Router} from 'express';
import {login, forgotPassword, resetPassword} from './controller';
import {password} from '../../services/passport';

const router = new Router();

router.post('/forgot-password', forgotPassword);

router.put('/forgot-password', resetPassword);

router.post(
  '/',
  password(),
  login,
);

export default router;
