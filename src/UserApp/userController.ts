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

        const user = await userService.authenticateUser(email, password);

        if (user == null) {
            return res.status(401).json({ err: "неправильні дані" });
        } else {
            res.cookie('user', JSON.stringify(user));
            return res.status(200).json(user);
        }
    } catch (err) {
        console.error("помилка під час логіну:", err);
        return res.status(500).json({ err: "помилка сервера" });
    }
}

async function authRegistration(req: Request, res: Response) {
    try {
        const { email, password, username } = req.body;

        const result = await userService.registerUser({ email, password, username });

        if (result == null) {
            return res.status(409).json({ err: "юзер вже існує" });
        } else {
            res.cookie('user', JSON.stringify(result));
            return res.status(201).json(result);
        }
    } catch (err) {
        console.error("помилка під час реєстрації:", err);
        return res.status(500).json({ err: "серверна помилка" });
    }
}

const userController = {
    login: login,
    register: register,
    authUser: authUser,
    authRegistration: authRegistration,
}

export default userController