//роутер для постів, дає маршрути контролеру
import { Router } from 'express';
import { getAllPosts, getPostById, createPost } from '../controllers/postController';

const router: Router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/create', createPost);

export default router;
