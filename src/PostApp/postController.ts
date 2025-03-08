//контролер для постів, оброблює запити і викликає сервіси
import { Request, Response } from 'express';
import postService from './postService';
export function getAllPosts(req: Request, res: Response){
    const posts = postService.getAllPosts();
    res.render('posts', { posts });
}

export function getPostById(req: Request, res: Response){
    const postId: number = parseInt(req.params.id);
    const post = postService.getPostById(postId);

    if (post) {
        res.render('post', { post });
    } else {
        res.render('post_not_found', { postId });
    }
}

export function createPost(req: Request, res: Response){
    const newPost = postService.createPost(req.body);
    res.json({ message: 'пост створено', post: newPost });
}
