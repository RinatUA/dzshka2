import userRepository from './userRepository';
import { ISuccess, IError } from '../types';
import { IUser } from './types'
import bcryptjs from 'bcryptjs';
import { SECRET_KEY } from '../config/config';
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express';

async function authenticateUser(email: string, password: string, res: Response) {
    const user = await userRepository.findUserByEmail(email);
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
        return { status: "error", message: "згадуй пароль" };
    }
    const token = sign({ id: user.id, email: user.email, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token);
    return user;
}

async function registerUser(userData: { email: string, password: string, username: string }, res: Response): Promise< IError | ISuccess<IUser> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        return { status: "error", message: "ти не один" };
    }
    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    const newUser = await userRepository.createUser({
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        role: "user"
    });

    const token = sign(newUser.data, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token);
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
