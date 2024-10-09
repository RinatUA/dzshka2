//сервіс для роботи з постами, операції з даними
const moment = require('moment');

const posts = [
    { id: 1, name: 'post1', author: 'author1', description: 'desc1', date: '2023/10/01 14:30:00' },
    { id: 2, name: 'post2', author: 'author2', description: 'desc2', date: '2023/10/05 11:15:00' },
    { id: 3, name: 'post3', author: 'author3', description: 'desc3', date: '2023/10/10 16:45:00' }
];

function getAllPosts() {
    return posts;
}

function getPostById(id) {
    return posts.find(p => p.id === parseInt(id));
}

function createPost(postData) {
    const newPost = {
        id: posts.length + 1,
        name: postData.name,
        author: postData.author,
        description: postData.description,
        date: moment().format('YYYY/MM/DD HH:mm:ss')
    };
    posts.push(newPost);
    return newPost;
}

module.exports = { getAllPosts, getPostById, createPost };
