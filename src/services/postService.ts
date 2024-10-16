// //сервіс для роботи з постами, операції з даними
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

async function getAllPosts() {
    return await prisma.post.findMany();
}

async function getPostById(id: number) {
    return await prisma.post.findUnique({
        where: { id }
    });
}

async function createPost(postData: { name: string, author: string, description: string }) {
    const newPost = await prisma.post.create({
        data: {
            name: postData.name,
            author: postData.author,
            description: postData.description,
            date: moment().toDate()
        }
    });
    return newPost;
}

async function updatePost(id: number, updateData: { name?: string, author?: string, description?: string }) {
    return await prisma.post.update({
        where: { id },
        data: updateData
    });
}

async function deletePost(id: number) {
    return await prisma.post.delete({
        where: { id }
    });
}

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
