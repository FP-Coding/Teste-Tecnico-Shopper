import { Router } from 'express';
import ProductController from '../controllers/Product.controller';

const baseController = new ProductController();
const router = Router();

router.post('/', baseController.create);

export default Router;