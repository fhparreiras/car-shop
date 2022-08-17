import 'express-async-errors';
import express from 'express';
import errorHandler from './middlewares/error';
import route from './routes/car';

const app = express();
app.use(express.json());
app.use(route);
app.use(errorHandler);

export default app;
