import client from '../client/prismaClient';

async function findUserByEmail(email: string) {
    const user = await client.user.findUnique({
        where: { email }
    });
    return user || null;
}

async function createUser(userData: { email: string, password: string, username: string, role: string }) {
    const newUser = await client.user.create({
        data: {
            email: userData.email,
            password: userData.password,
            username: userData.username,
            role: userData.role
        }
    });
    return newUser;
}

const userRepository = {
    findUserByEmail,
    createUser
};

export default userRepository;