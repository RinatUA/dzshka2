import { PrismaClient } from '@prisma/client';
// import moment from 'moment';

const prisma = new PrismaClient();

async function seedSinglePost() {
    await prisma.post.create({
        data: {
            name: 'First post',
            author: 'Author1',
            description: 'Description for first post',
            date: new Date(),
        }
    });
    console.log('Single post created');
}

async function seedMultiplePosts() {
    await prisma.post.createMany({
        data: [
            {
                name: 'Second post',
                author: 'Author2',
                description: 'Description for second post',
                date: new Date(),
            },
            {
                name: 'Third post',
                author: 'Author3',
                description: 'Description for third post',
                date: new Date(),
            },
        ]
    });
    console.log('Multiple posts created');
}

async function seedUpdatePost() {
    await prisma.post.update({
        where: { id: 1 },
        data: {
            name: 'Updated post',
            author: 'Updated author',
        },
    });
    console.log('Post updated');
}

async function seedGetPost() {
    const post = await prisma.post.findUnique({
        where: { id: 1 }
    });
    console.log('Single post:', post);
}

async function seedGetMultiplePosts() {
    const posts = await prisma.post.findMany();
    console.log('All posts:', posts);
}

async function seedDeletePost() {
    await prisma.post.delete({
        where: { id: 1 }
    });
    console.log('Post deleted');
}

async function main() {
    await seedSinglePost();
    await seedMultiplePosts();
    await seedUpdatePost();
    await seedGetPost();
    await seedGetMultiplePosts();
    await seedDeletePost();
}   

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
