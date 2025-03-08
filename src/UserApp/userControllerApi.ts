import { Request, Response } from 'express'
import userService from './userService'

async function authLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await userService.authenticateUser(email, password, res)

        if (user == null) {
            return res.status(401).json({ err: 'неправильні дані' })
        }
        
        res.status(200).json({ message: 'вийшло зайти', user })
    } catch (err) {
        console.error('помилка під час логіну:', err)
        return res.status(500).json({ err: 'помилка сервера' })
    }
}


async function authRegistration(req: Request, res: Response) {
    const data = req.body

    const result = await userService.registerUser(data, res)

    if (result.status == 'error'){
        res.send(result.message)
        return
    }
    res.status(200).json({ status: "ok" });
}

async function userInfo(req: Request, res: Response){
    const userId = res.locals.userId
    const result = await userService.getUserById(userId)

    if (result.status === 'error') {
        res.status(400)
    }
    res.status(200).json({ user: result });
}

const userControllerApi = {
    authLogin: authLogin,
    authRegistration: authRegistration,
    userInfo: userInfo,
}

export default userControllerApi