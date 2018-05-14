import {Router} from 'express';
import {token} from '../../services/passport';
import {createAnswers} from './controller';

const router = new Router();

router.post(
  '/',
  token({required: true, roles: ['user']}),
  createAnswers,
);

export default router;
