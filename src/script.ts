import express, { Express, Request, Response } from 'express'
import path from 'path';
import postRouter from './PostApp/postRouter';
import userRouter from './UserApp/userRouter';
import cookieParser from 'cookie-parser';
import postRouterApi from './PostApp/postRouterApi';
import commentRouterApi from './CommentApp/commentRouterApi';
import cors from 'cors'

const app: Express = express();
const port: number = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.json());
app.use(cookieParser());
app.use('/static/', express.static(path.join(__dirname, 'static')))
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use('/api/post/', postRouterApi)
app.use('/api/comment/', commentRouterApi)

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

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
    