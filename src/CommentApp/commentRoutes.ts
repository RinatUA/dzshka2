import { Router } from 'express';
import { getCommentsByPostId, getCommentsByUserId } from './commentController';

const router: Router = Router();

router.post('/byPost', getCommentsByPostId);
router.post('/byUser', getCommentsByUserId);

export default router;
