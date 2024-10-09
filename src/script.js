const express = require('express');
const path = require('path');
const postRouter = require('./src/routers/postRouter');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.use('/posts', postRouter);

app.get('/date', (req, res) => {
    const currentDate = moment().format('YYYY/MM/DD HH:mm:ss');
    console.log(`дата та час: ${currentDate}`);
    res.send(`дата та час: ${currentDate}`);
});

app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/comments', (req, res) => {
    const comments = [
        { 
            title: 'cool title', 
            message: 'Lorem ipsum dolor sit amet consectetur.', 
            author: 'Author 1' 
        },
        { 
            title: 'awesome title', 
            message: 'Lorem ipsum dolor sit amet consectetur.', 
            author: 'Author 2' 
        },
        { 
            title: 'perfect title', 
            message: 'Lorem ipsum dolor sit amet consectetur.', 
            author: 'Author 3' 
        }
    ];
    res.render('comments', { comments });
});

app.listen(port, () => {
    console.log(`сервер http://localhost:${port}`);
});