const express = require('express');
const moment = require('moment');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates')); 

function getDate() {
    return moment().format('YYYY/MM/DD HH:mm:ss');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'templates', 'index.html'));
});

app.get('/date', (req, res) => {
    const currentDate = getDate();
    console.log(`дата та час: ${currentDate}`);
    res.send(`дата та час: ${currentDate}`);
});

app.get('/posts', (req, res) => {
    const posts = [
        { name: 'Post 1', author: 'Author 1' },
        { name: 'Post 2', author: 'Author 2' },
        { name: 'Post 3', author: 'Author 3' }
    ];

    res.render('posts', { posts });
});

app.get('/user', (req, res) => {
    res.render('user');
});

app.listen(port, () => {
    console.log(`сервер http://localhost:${port}`);
});
