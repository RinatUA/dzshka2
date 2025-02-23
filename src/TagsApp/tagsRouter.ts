import express from 'express'
import tagsControllerApi from './tagsControllerApi';
const router = express.Router();

router.get('/all', tagsControllerApi.allTags);

export default router;