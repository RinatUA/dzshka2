import client from '../client/prismaClient';
import { Prisma } from '@prisma/client';

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
            where: { email }
        });
        return user;
    } catch (err) {
        console.error("не знайшов юзера по емейлу:", err);
    }
}

async function createUser(data: { email: string, password: string, username: string, role: string }) {
    try {
        const newUser = await client.user.create({
            data: data
        });
        return newUser;
    } catch (err) {
        console.error("помилка при створенні юзера:", err);
        throw err;
    }
}

async function findUserById(userId: number){
    try {
        const user = await client.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;

    } catch (err) {
        console.log(err)
    }

}

const userRepository = {
    findUserById,
    findUserByEmail,
    createUser,
};

export default userRepository;