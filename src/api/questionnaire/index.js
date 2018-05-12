import { Router } from 'express';
import { createQuestionnaire } from './controller';
import { token } from '../../services/passport';

const router = new Router();

router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  createQuestionnaire,
);

export default router;
