import { Request, Response } from 'express';
import tagsService from './tagsService';

async function allTagsController(req: Request, res: Response) {
    const context = await tagsService.allTags();
    res.json(context);
}

const tagsControllerApi = {
    allTags: allTagsController,
};

export default tagsControllerApi;