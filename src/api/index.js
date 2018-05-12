import { Router } from 'express';
import auth from './auth';
import user from './user';
import questionnaire from './questionnaire';

const router = new Router();

router.use('/users', user);
router.use('/auth', auth);
router.use('/questionnaire', questionnaire);

export default router;
