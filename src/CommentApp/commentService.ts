import commentRepository from './commentRepository';

async function getCommentsForPost(postId: number) {
    return await commentRepository.getCommentsByPostId(postId);
}

async function getCommentsForUser(userId: number) {
    return await commentRepository.getCommentsByUserId(userId);
}

export { getCommentsForPost, getCommentsForUser };