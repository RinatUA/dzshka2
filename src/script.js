const express = require('express');
const moment = require('moment');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

function getDate() {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}

const posts = [
    { 
        id: 1, 
        name: 'post1', 
        author: 'author1', 
        description: 'desc1', 
        date: '2023/10/01 14:30:00' 
    },
    { 
        id: 2, 
        name: 'post2', 
        author: 'author2', 
        description: 'desc2', 
        date: '2023/10/05 11:15:00' 
    },
    { 
        id: 3, 
        name: 'post3', 
        author: 'author3', 
        description: 'desc3', 
        date: '2023/10/10 16:45:00' 
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'templates', 'index.html'));
});

app.get('/date', (req, res) => {
    const currentDate = getDate();
    console.log(`дата та час: ${currentDate}`);
    res.send(`дата та час: ${currentDate}`);
});

app.get('/posts', (req, res) => {
    res.render('posts', { posts });
});

app.post('/post/create', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        date: moment().format('YYYY/MM/DD HH:mm:ss')
    };

    posts.push(newPost);
    console.log('новий пост:', newPost);

    res.json({ message: 'пост створено', post: newPost });
});


app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id); 
    const post = posts.find(p => p.id === postId);

    if (post) {
        res.render('post', { post });
    } else {
        res.render('post_not_found', { postId });
    }
});

app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/comments', (req, res) => {
    const comments = [
        { 
            title: 'cool title', 
            message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ad. Optio dolores molestiae, in, ex perferendis vel error quidem sint labore dolor quia repellendus. Placeat nesciunt obcaecati quis dolore nostrum.', 
            author: 'Author 1', 
        },
        { 
            title: 'awesome title', 
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ducimus ut exercitationem sed natus officiis ab rerum corporis sequi beatae ipsam asperiores, adipisci reiciendis aspernatur placeat animi veniam pariatur molestias?', 
            author: 'Author 2', 
        },
        { 
            title: 'perfect title', 
            message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, quidem possimus quas dolorem praesentium doloremque nemo perspiciatis voluptates est quae distinctio nisi aliquid, quibusdam fugit nam ipsa culpa hic illum!', 
            author: 'Author 3', 
        }
    ];
    res.render('comments', { comments });
});

app.listen(port, () => {
    console.log(`сервер http://localhost:${port}`);
});
