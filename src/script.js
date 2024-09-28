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
