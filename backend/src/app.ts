import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import ProductController from './controllers/Product.controller';

const app = express();

app.use(express.json());

app.get('/product/:id', (req: Request, res: Response, next: NextFunction) => ProductController.find(req, res, next)); 
app.get('/product', (req: Request, res: Response, next: NextFunction) => ProductController.list(req, res, next)); 
app.post('/product', (req: Request, res: Response, next: NextFunction) => ProductController.create(req, res, next));

export default app;