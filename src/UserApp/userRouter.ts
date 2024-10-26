import userController from './userController';
import {Router} from 'express';

const router = Router();

router.post('/login', userController.authUser);
router.get('/login', userController.login);
router.post('/register', userController.authRegistration);
router.get('/register', userController.register);
 
export default router;