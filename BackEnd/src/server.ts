import express, {Request, Response,  NextFunction } from 'express';
import {json, urlencoded} from 'body-parser';
import connectDB from './database/database';
import  productRoutes  from './routes/productRoutes';
import authRouter from './routes/authRoutes';
import clientRouter from './routes/clientRoutes';

import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

app.use(urlencoded({
    extended:true
}))
app.use(cors({
    origin: 'http://localhost:3000', // your frontend server's URL
    credentials: true
}));
app.use(json());

connectDB();

app.use('/api/auth', authRouter);

app.use('/api',productRoutes);

app.use('/api/client',clientRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('error i don t know why ', err);
    res.status(500).send('Something went wrong!');
});
app.listen(port, ()=>{
    console.log(`Application running on ${port}`);
})
