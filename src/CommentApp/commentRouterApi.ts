import  { Router } from 'express'
import commentControllerApi from './CommentControllerApi';

const router = Router();

router.get('/:id', commentControllerApi.getCommentByPostId)

export default router;