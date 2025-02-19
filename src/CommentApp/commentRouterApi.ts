import  { Router } from 'express'
import commentControllerApi from './commentControllerApi';

const router = Router();

router.get('/:id', commentControllerApi.getCommentByPostId)

export default router;