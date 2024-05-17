import express from 'express';
import { cadastrarProduto } from '../controllers/productController';

const router = express.Router();

router.post('/product', cadastrarProduto);

export default router;