import express from 'express';
import { atualizarProduto, cadastrarProduto, deletarProdutos, lerProduto, lerTodosOsProdutos } from '../controllers/productController';

const router = express.Router();

router.get('/product/', lerTodosOsProdutos);
router.get('/product/:id', lerProduto);
router.post('/product', cadastrarProduto);
router.put('/product/:id', atualizarProduto);
router.delete('/product/:id', deletarProdutos);

export default router;