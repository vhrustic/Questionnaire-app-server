import { Router } from 'express';
import {createPage, deletePage, getPage} from './controller';
import { token } from '../../services/passport';

const router = new Router();

router.get(
  '/:questionnaireId/:pageId',
  token({ required: true, roles: ['admin'] }),
  getPage,
);

router.post(
  '/:questionnaireId',
  token({ required: true, roles: ['admin'] }),
  createPage,
);

router.put(
  '/:pageId',
  token({ required: true, roles: ['admin'] }),
);

router.delete(
  '/:pageId',
  token({ required: true, roles: ['admin'] }),
  deletePage,
);


export default router;
