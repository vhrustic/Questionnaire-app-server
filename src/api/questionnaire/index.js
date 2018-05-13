import { Router } from 'express';
import {createQuestionnaire, deleteQuestionnaire, getQuestionnaire, getAllQuestionnaires, updateQuestionnaire} from './controller';
import { token } from '../../services/passport';

const router = new Router();

router.get(
  '/',
  token({ required: true, roles: ['admin'] }),
  getAllQuestionnaires,
);

router.get(
  '/:questionnaireId',
  token({ required: true, roles: ['admin'] }),
  getQuestionnaire,
);

router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  createQuestionnaire,
);

router.put(
  '/:questionnaireId',
  token({ required: true, roles: ['admin'] }),
  updateQuestionnaire,
);

router.delete(
  '/:questionnaireId',
  token({ required: true, roles: ['admin'] }),
  deleteQuestionnaire,
);


export default router;
