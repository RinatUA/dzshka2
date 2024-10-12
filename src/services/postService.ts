//сервіс для роботи з постами, операції з даними
import moment from 'moment';

type Post = {
    id: number;
    name: string;
    author: string;
    description: string;
    date: string;
};

const posts: Post[] = [
    { id: 1, name: 'post1', author: 'author1', description: 'desc1', date: '2023/10/01 14:30:00' },
    { id: 2, name: 'post2', author: 'author2', description: 'desc2', date: '2023/10/05 11:15:00' },
    { id: 3, name: 'post3', author: 'author3', description: 'desc3', date: '2023/10/10 16:45:00' }
];

export function getAllPosts(): Post[] {
    return posts;
}

export function getPostById(id: number): Post | undefined {
    return posts.find(p => p.id === id);
}

export function createPost(postData: Omit<Post, 'id' | 'date'>): Post {
    const newPost: Post = {
        id: posts.length + 1,
        name: postData.name,
        author: postData.author,
        description: postData.description,
        date: moment().format('YYYY/MM/DD HH:mm:ss')
    };
    posts.push(newPost);
    return newPost;
}
