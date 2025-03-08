import { Request, Response } from 'express';
import tagsService from './tagsService';

async function allTagsController(req: Request, res: Response) {
    const result = await tagsService.allTags();
    if (result.status === 'error') {
        res.status(500);
        return
    }
    res.json(result);
}

const tagsControllerApi = {
    allTags: allTagsController,
};

export default tagsControllerApi;