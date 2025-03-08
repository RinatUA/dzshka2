//сервіс для роботи з постами, операції з даними
import postRepository from "./postRepository";

async function allPosts() {
    const posts = await postRepository.getAllPosts();
    return posts;
    }

async function createPost(postData: { name: string, author: string, description: string }) {
    const newPost = await postRepository.createPost(postData);
    return newPost;
}

async function deletePost() {
    const post = await postRepository.deletePost();
    return post;
}
const postService = { 
    createPost, 
    deletePost,
    allPosts, 
};
export default postService 
