import { Prisma } from '@prisma/client';
import client from '../client/prismaClient';

async function getAllPosts() {
    try {
        let posts = await client.post.findMany();
        return posts;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err == 'P2002') {
                console.log('порушення унікальності');
                throw err; 
            }
        }
        console.log('сталась помилка при пошуку всіх продуктів:', err);
        throw err;
    }
}

async function getPostById(id: number) {
    try {
        let post = await client.post.findUnique({
            where: {
                id: id
            }
        });
        return post;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err == 'P2015') {
                console.log('продукт з цим id не знайдено');
                throw err;
            }
        }
        console.log(`сталась помилка при отриманні продукту з id ${id}:`, err);
        throw err;
    }
}

async function createPost(data: Prisma.PostCreateInput) {
    try {
        let post = await client.post.create({
            data: data
        });
        return post;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err == 'P2002') {
                console.log('продукт вже існує');
                throw err;
            }
        }
        console.log('помилка при створенні продукту', err);
        throw err;
    }
}

async function deletePost() {
    try {
        const post = await postRepository.deletePost;
        if (!post) {
            return { status: 'error', message: 'пост не знайдено' };
        }

        return { status: 'success', data: post };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'помилка серверу' };
    }
}

const postRepository = {
    getAllPosts,
    getPostById,
    createPost,
    deletePost
};

export default postRepository;