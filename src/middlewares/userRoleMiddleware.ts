import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config';

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const cookies = req.cookies
    if (cookies.token){
        const token = verify(cookies.token, SECRET_KEY)
        res.locals.user = token
        next()
    } else {
        res.sendStatus(401)
    }
}


export default authMiddleware;