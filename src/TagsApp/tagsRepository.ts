import { Prisma } from '@prisma/client';
import client from '../client/prismaClient';

async function findTags() {
    try {
        const tags = await client.tags.findMany({
        });
        return tags;

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            console.log(err);
            throw err;
        }
    }
}

const tagsRepository = {
    findTags: findTags,
};

export default tagsRepository;