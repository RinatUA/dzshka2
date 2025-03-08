import { Request, Response } from 'express';
import userService from './userService';

function login(req: Request, res: Response){
    res.render('login')
}

function register(req: Request, res: Response){
    res.render('register')
}

async function authUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password, res);

        if (user == null) {
            return res.status(401).json({ err: 'неправильні дані' });
        }

        res.status(200).json({ message: 'вийшло зайти', user });
    } catch (err) {
        console.error('помилка під час логіну:', err);
        return res.status(500).json({ err: 'помилка сервера' });
    }
}


async function authRegistration(req: Request, res: Response) {
    const { email, password, username } = req.body;

    const result = await userService.registerUser({ email, password, username }, res);

    if (result.status == 'error'){
        res.send(result.message)
        return
    }

    res.status(200).json({ status: "ok" }); 
    }

const userController = {
    login: login,
    register: register,
    authUser: authUser,
    authRegistration: authRegistration,
}

export default userController