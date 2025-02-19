import { Request, Response } from 'express';
import commentService from './commentService';

async function getCommentByPostId(req: Request, res: Response) {
    const postid = await Number(req.params.id);
    const result = await commentService.getCommentsForPost(postid);

    res.json(result)
}

const commentControllerApi = {
    getCommentByPostId
};

export default commentControllerApi;