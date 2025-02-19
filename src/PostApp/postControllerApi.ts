import { Request, Response } from 'express';
import postService from './postService';

async function allPostsController(req: Request, res: Response) {
    const context = await postService.getAllPosts();
    res.json(context);
}

const postControllerApi = {
    allPostsController
};

export default postControllerApi;