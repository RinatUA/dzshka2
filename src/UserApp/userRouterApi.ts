import express from 'express';
import userControllerApi from './userControllerApi';
import { authTokenMiddleware } from '../middlewares/authTokenMiddleware';

const router = express.Router();

router.post('/login', userControllerApi.authLogin);
router.post('/register', userControllerApi.authRegistration);
router.get('/me', authTokenMiddleware, userControllerApi.userInfo);

export default router;