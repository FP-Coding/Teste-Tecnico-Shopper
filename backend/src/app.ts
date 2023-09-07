import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import ProductController from './controllers/Product.controller';
import PackController from './controllers/Pack.controller';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.put('/product/:id', (req: Request, res: Response, next: NextFunction) => ProductController.update(req, res, next));
app.delete('/product/:id', (req: Request, res: Response, next: NextFunction) => ProductController.delete(req, res, next)); 
app.get('/product/:id', (req: Request, res: Response, next: NextFunction) => ProductController.find(req, res, next)); 
app.get('/product', (req: Request, res: Response, next: NextFunction) => ProductController.list(req, res, next)); 
app.post('/product', (req: Request, res: Response, next: NextFunction) => ProductController.create(req, res, next));


app.get('/pack/:id', (req: Request, res: Response, next: NextFunction) => PackController.find(req, res, next));
app.get('/pack', (req: Request, res: Response, next: NextFunction) => PackController.list(req, res, next));
app.post('/pack', (req: Request, res: Response, next: NextFunction) => PackController.create(req, res, next));

app.use(errorHandler);


export default app;