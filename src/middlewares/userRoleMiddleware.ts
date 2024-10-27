import { Request, Response, NextFunction } from 'express';

const userRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    if (user && user.role == 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export default userRoleMiddleware;