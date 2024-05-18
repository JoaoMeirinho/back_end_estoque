import express from 'express';
import { atualizarProduto, cadastrarProduto, lerProduto } from '../controllers/productController';

const router = express.Router();

router.get('/product/:id', lerProduto);
router.post('/product', cadastrarProduto);
router.put('/product/:id', atualizarProduto);

export default router;