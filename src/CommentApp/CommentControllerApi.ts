import { Request, Response } from 'express';
import commentService from './commentService';

async function getCommentByPostId(req: Request, res: Response) {
    // await для Number не надо
    const postid = await Number(req.params.id);
    const result = await commentService.getCommentsForPost(postid);

    res.json(result)
}

const commentControllerApi = {
    getCommentByPostId
};

export default commentControllerApi;