import express, {Express, Request, Response} from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.get('/test', (req: Request, res: Response) => {
    res.send('Test');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

