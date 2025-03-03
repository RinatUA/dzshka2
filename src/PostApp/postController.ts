//контролер для постів, оброблює запити і викликає сервіси
import { Request, Response } from 'express';
// Так не работает, у тебя экспортируется объект по умолчанию
// import postService from './postService';
import { getAllPosts as getAll, getPostById as getPostByIdService, createPost as createPostService } from './postService';

export function getAllPosts(req: Request, res: Response){
    const posts = getAll();
    res.render('posts', { posts });
}

export function getPostById(req: Request, res: Response){
    const postId: number = parseInt(req.params.id);
    const post = getPostByIdService(postId);

    if (post) {
        res.render('post', { post });
    } else {
        res.render('post_not_found', { postId });
    }
}

export function createPost(req: Request, res: Response){
    const newPost = createPostService(req.body);
    res.json({ message: 'пост створено', post: newPost });
}
