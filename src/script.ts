import express, { Express, Request, Response } from 'express'
import path from 'path';
import postRouter from './routers/postRouter';
import userRoutes from './routers/userRouter';

const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.use('/posts', postRouter);
app.use('/users', userRoutes);

app.get('/date', (req: Request, res: Response) => {
    const currentDate = new Date().toISOString();
    console.log(`дата та час: ${currentDate}`);
    res.send(`дата та час: ${currentDate}`);
});

app.get('/user', (req: Request, res: Response) => {
    res.render('user');
});

app.get('/comments', (req: Request, res: Response) => {
    const comments: any[] = [
        { title: 'cool title', message: 'Lorem ipsum dolor sit amet consectetur.', author: 'Author 1' },
        { title: 'awesome title', message: 'Lorem ipsum dolor sit amet consectetur.', author: 'Author 2' },
        { title: 'perfect title', message: 'Lorem ipsum dolor sit amet consectetur.', author: 'Author 3' }
    ];
    res.render('comments', { comments });
});

app.listen(port, () => {
    console.log(`сервер http://localhost:${port}`);
});
