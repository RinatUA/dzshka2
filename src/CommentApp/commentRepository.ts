import client from '../client/prismaClient';

async function getCommentsByPostId(postId: number) {
    return await client.comment.findMany({
        where: { postId }
    });
}

async function getCommentsByUserId(userId: number) {
    return await client.comment.findMany({
        where: { userId }
    });
}

const commentRepository = {
    getCommentsByPostId,
    getCommentsByUserId
};

export default commentRepository;