//контролер для постів, оброблює запити і викликає сервіси
const postService = require('../services/postService');

function getAllPosts(req, res) {
    const posts = postService.getAllPosts();
    res.render('posts', { posts });
}

function getPostById(req, res) {
    const postId = req.params.id;
    const post = postService.getPostById(postId);
    
    if (post) {
        res.render('post', { post });
    } else {
        res.render('post_not_found', { postId });
    }
}

function createPost(req, res) {
    const newPost = postService.createPost(req.body);
    res.json({ message: 'пост створено', post: newPost });
}

module.exports = { getAllPosts, getPostById, createPost };
