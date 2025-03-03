import  { Router } from 'express'
// почему файл CommentControllerApi с большой буквы
import commentControllerApi from './commentControllerApi';

const router = Router();

router.get('/:id', commentControllerApi.getCommentByPostId)

export default router;