import express from 'express';
import userControllerApi from './userControllerApi';

const router = express.Router();

router.post('/login', userControllerApi.authLogin);
router.post('/register', userControllerApi.authRegistration);

export default router;