import express from 'express';
import 'dotenv/config';
import ProductRouter from './routes/Product.route';

const app = express();

app.use(express.json());
app.use('/product', ProductRouter);

export default app;