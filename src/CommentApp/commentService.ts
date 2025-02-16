import commentRepository from './commentRepository';
import { Prisma } from '@prisma/client'
import { IError, ISuccess } from '../types'
import { IComment } from './types'

async function getCommentsForPost(postId: number): Promise<ISuccess<IComment> | IError> {
    return await commentRepository.getCommentsByPostId(postId);
}

async function getCommentsForUser(userId: number): Promise<ISuccess<IComment[]> | IError> {
    return await commentRepository.getCommentsByUserId(userId);
}

export { getCommentsForPost, getCommentsForUser };