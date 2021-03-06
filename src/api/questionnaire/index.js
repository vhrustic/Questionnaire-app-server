import {Router} from 'express';
import {
  createQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaire,
  getAllQuestionnaires,
  updateQuestionnaire,
  getUncompletedQuestionnaires, getUserQuestionnaire,
} from './controller';
import {token} from '../../services/passport';

const router = new Router();

router.get(
  '/uncompleted/all',
  token({required: true, roles: ['user']}),
  getUncompletedQuestionnaires
);

router.get(
  '/uncompleted/:questionnaireId',
  token({required: true, roles: ['user']}),
  getUserQuestionnaire
);

router.get(
  '/:questionnaireId',
  token({required: true, roles: ['admin']}),
  getQuestionnaire,
);


router.get(
  '/',
  token({required: true, roles: ['admin']}),
  getAllQuestionnaires,
);


router.post(
  '/',
  token({required: true, roles: ['admin']}),
  createQuestionnaire,
);

router.put(
  '/:questionnaireId',
  token({required: true, roles: ['admin']}),
  updateQuestionnaire,
);

router.delete(
  '/:questionnaireId',
  token({required: true, roles: ['admin']}),
  deleteQuestionnaire,
);


export default router;
