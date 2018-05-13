import { Router } from 'express';
import {createQuestion, deleteQuestion, getQuestion, updateQuestion} from './controller';
import { token } from '../../services/passport';

const router = new Router();

router.get(
  '/:questionId',
  token({ required: true, roles: ['admin'] }),
  getQuestion,
);

router.post(
  '/:pageId',
  token({ required: true, roles: ['admin'] }),
  createQuestion,
);

router.put(
  '/:questionId',
  token({ required: true, roles: ['admin'] }),
  updateQuestion
);

router.delete(
  '/:questionId',
  token({ required: true, roles: ['admin'] }),
  deleteQuestion,
);


export default router;
