import { Request, Response } from 'express';
import tagsService from './tagsService';

async function allTagsController(req: Request, res: Response) {
    // это не контекст, а результат или response
    const context = await tagsService.allTags();
    res.json(context);
}

const tagsControllerApi = {
    allTags: allTagsController,
};

export default tagsControllerApi;