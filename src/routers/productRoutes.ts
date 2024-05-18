import express from 'express';
import { atualizarProduto, cadastrarProduto } from '../controllers/productController';

const router = express.Router();

router.post('/product', cadastrarProduto);
router.put('/product/:id', atualizarProduto);

export default router;