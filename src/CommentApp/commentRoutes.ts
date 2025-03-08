import { Router } from 'express';
import commentRepository from './commentRepository';

const router: Router = Router();

router.post('/byPost', commentRepository.getCommentsByPostId);
router.post('/byUser', commentRepository.getCommentsByUserId);

export default router;
