import userRepository from './userRepository';

async function authenticateUser(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    
    if (user == null) {
        return null;
    }

    if (user.password != password) {
        return null;
    }
    
    return user;
}

async function registerUser(userData: { email: string, password: string, username: string }) {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    
    if (existingUser != null) {
        return null;
    }

    const newUser = await userRepository.createUser({
        email: userData.email,
        password: userData.password,
        username: userData.username,
        role: "user"
    });

    return newUser;
}

const userService = {
    authenticateUser,
    registerUser,
};

export default userService;
