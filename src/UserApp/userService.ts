import userRepository from './userRepository';
import { ISuccess, IError } from '../types';
import { IUser } from './types'
import bcryptjs from 'bcryptjs';

async function authenticateUser(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
        return { status: "error", message: "згадуй пароль" };
    }

    return user;
}

async function registerUser(userData: { email: string, password: string, username: string }): Promise< IError | ISuccess<IUser> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    const newUser = await userRepository.createUser({
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        role: "user"
    });

    if (existingUser) {
        return { status: "error", message: "ти не один" };
    }
    
    return { status: "success", data: newUser};
}

async function getUserById(userId: number): Promise< IError | ISuccess<IUser>>{
    const user = await userRepository.findUserById(userId)

    if (!user) {
        return { status: "error", message: "User not found!"}
    }
    return { status: "success", data: user}
}
const userService = {
    authenticateUser,
    registerUser,
    getUserById,
};

export default userService;
