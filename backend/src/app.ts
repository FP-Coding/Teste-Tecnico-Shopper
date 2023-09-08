import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import ProductController from './controllers/Product.controller';
import PackController from './controllers/Pack.controller';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.patch('/products/price/:id', (req: Request, res: Response, next: NextFunction) => ProductController.update(req, res, next));
app.patch('/products/price/', (req: Request, res: Response, next: NextFunction) => ProductController.update(req, res, next));
app.delete('/products/:id', (req: Request, res: Response, next: NextFunction) => ProductController.delete(req, res, next)); 
app.get('/products/:id', (req: Request, res: Response, next: NextFunction) => ProductController.find(req, res, next)); 
app.get('/products', (req: Request, res: Response, next: NextFunction) => ProductController.list(req, res, next)); 
app.post('/products', (req: Request, res: Response, next: NextFunction) => ProductController.create(req, res, next));

app.get('/packs/:packId', (req: Request, res: Response, next: NextFunction) => PackController.find(req, res, next)); 
app.get('/packs', (req: Request, res: Response, next: NextFunction) => PackController.list(req, res, next));
app.post('/packs', (req: Request, res: Response, next: NextFunction) => PackController.create(req, res, next));

app.use(errorHandler);


export default app;