import client from '../client/prismaClient';
import { User } from "@prisma/client";

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
            where: { email }
        });
        return user;
    } catch (err) {
        console.error("не знайшов юзера по емейлу:", err);
        return null;
    }
}

async function createUser(userData: { email: string, password: string, username: string, role: string }) {
    try {
        const newUser = await client.user.create({
            data: userData
        });
        return newUser;
    } catch (err) {
        console.error("помилка при створенні юзера:", err);
        throw err;
    }
}

const userRepository = {
    findUserByEmail,
    createUser
};

export default userRepository;