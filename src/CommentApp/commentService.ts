import commentRepository from './commentRepository';
import { IError, ISuccess } from '../types'
import { Comment } from './types'

async function getCommentsForPost(postId: number): Promise<ISuccess<Comment> | IError> {
    return await commentRepository.getCommentsByPostId(postId);
}

async function getCommentsForUser(userId: number): Promise<ISuccess<Comment[]> | IError> {
    return await commentRepository.getCommentsByUserId(userId);
}
const commentService = {
    getCommentsForPost, 
    getCommentsForUser
}

export default commentService;