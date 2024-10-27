import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let user;
    if (req.cookies.user) {
        user = JSON.parse(req.cookies.user);
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (user.email && user.name && user.role) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;