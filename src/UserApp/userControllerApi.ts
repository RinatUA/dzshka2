import express, { Express, Request, Response } from 'express'
import userService from './userService'
import { SECRET_KEY } from '../config/config'
import { sign } from 'jsonwebtoken'

async function authLogin(req: Request, res: Response) {
    const data = req.body
    try {
        const { email, password } = req.body
        const user = await userService.authenticateUser(email, password)

        if (user == null) {
            return res.status(401).json({ err: 'неправильні дані' })
        }

        const token = sign({ id: user.id, email: user.email, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token,)
        
        res.status(200).json({ message: 'вийшло зайти', user })
    } catch (err) {
        console.error('помилка під час логіну:', err)
        return res.status(500).json({ err: 'помилка сервера' })
    }
}


async function authRegistration(req: Request, res: Response) {
    const data = req.body
    const { email, password, username } = req.body

    const result = await userService.registerUser(data)

    if (result.status == 'error'){
        res.send(result.message)
        return
    }
    const token = sign(result.data, SECRET_KEY, {expiresIn: '1h'})
    res.cookie('token', token)
    res.status(200).json({ status: "ok" });
}

const userControllerApi = {
    authLogin: authLogin,
    authRegistration: authRegistration,
}

export default userControllerApi