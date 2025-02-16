import userRepository from './userRepository';
import { ISuccess, IError } from '../types';
import { IUser } from './types'

async function authenticateUser(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user || user.password != password) {
        return null;
    }
    return user;
}

async function registerUser(userData: { email: string, password: string, username: string }): Promise< IError | ISuccess<IUser> > {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    
    if (existingUser) {
        return { status: "error", message: "User exists" };
    }


    const newUser = await userRepository.createUser({
        email: userData.email,
        password: userData.password,
        username: userData.username,
        role: "user"
    });

    return { status: "ok", user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role } };
}

const userService = {
    authenticateUser,
    registerUser,
};

export default userService;
