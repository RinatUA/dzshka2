import { Request, Response } from 'express';
import userService from './userService';
import { SECRET_KEY } from '../config/token';
import { sign } from 'jsonwebtoken'

function login(req: Request, res: Response){
    res.render('login')
}

function register(req: Request, res: Response){
    res.render('register')
}

async function authUser(req: Request, res: Response) {
    const data = req.body
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password);

        if (user == null) {
            return res.status(401).json({ err: 'неправильні дані' });
        }

        const token = sign({ id: user.id, email: user.email, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token,);
        
        res.status(200).json({ message: 'вийшло зайти', user });
    } catch (err) {
        console.error('помилка під час логіну:', err);
        return res.status(500).json({ err: 'помилка сервера' });
    }
}


async function authRegistration(req: Request, res: Response) {
    const data = req.body
    const { email, password, username } = req.body;

    const result = await userService.registerUser({ email, password, username });

    if (result.status == 'error'){
        res.send(result.message)
        return
    }
    const token = sign(result.data, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token);
    res.status(200).json({ status: "ok" }); 
    }

const userController = {
    login: login,
    register: register,
    authUser: authUser,
    authRegistration: authRegistration,
}

export default userController