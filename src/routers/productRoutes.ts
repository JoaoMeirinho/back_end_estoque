import express from 'express';
import { atualizarProduto, cadastrarProduto, deletarProdutos, lerProduto, lerTodosOsProdutos } from '../controllers/productController';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.get('/product/', auth, lerTodosOsProdutos);
router.get('/product/:id', auth ,lerProduto);
router.post('/product', auth ,cadastrarProduto);
router.put('/product/:id', auth ,atualizarProduto);
router.delete('/product/:id', auth ,deletarProdutos);

export default router;