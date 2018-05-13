import { Router } from 'express';
import auth from './auth';
import user from './user';
import questionnaire from './questionnaire';
import page from './page';

const router = new Router();

router.use('/users', user);
router.use('/auth', auth);
router.use('/questionnaires', questionnaire);
router.use('/pages', page);

export default router;
