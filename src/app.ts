import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import BodyParser from 'body-parser';
import indexRouter from './routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(morgan('combined'));

// Routes
app.use('/api/v1/', indexRouter);

export default app;
