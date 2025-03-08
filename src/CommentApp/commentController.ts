import { Request, Response } from 'express';
import commentService from './commentService';

export async function getCommentsByPostId(req: Request, res: Response) {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ message: 'postId is required' });
    
    try {
        const comments = await commentService.getCommentsForPost(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'something went wrong lol', error });
    }
}

export async function getCommentsByUserId(req: Request, res: Response) {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    
    try {
        const comments = await commentService.getCommentsForUser(userId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'something went wrong lol', error });
    }
}


export async function comments(req: Request, res: Response) {
    res.render('comments', { comments });
};