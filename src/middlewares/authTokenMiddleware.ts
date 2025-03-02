import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

export function authTokenMiddleware(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(400)
        return 
    }

    const [bearer, token] = authHeader.split(", ");

    if (bearer !== "Bearer") {
        res.status(401)
    }

    try {
        const verified = verify(token, SECRET_KEY) as { userId: number };
        res.locals.userId = verified.userId;
    } catch (error) {
        res.status(401)
    }
}