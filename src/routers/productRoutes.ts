import express from 'express';
import { atualizarProduto, cadastrarProduto, deletarProdutos, lerProduto, lerTodosOsProdutos } from '../controllers/productController';
import { auth } from '../middlewares/auth';
import multer from 'multer';
import storage from '../middlewares/multer';

const upload = multer({storage: storage})

const router = express.Router();

router.get('/product/', auth, lerTodosOsProdutos);
router.get('/product/:id', auth ,lerProduto);
router.post('/product', auth , upload.single("image"), cadastrarProduto);
router.put('/product/:id', auth, upload.single("image"),atualizarProduto);
router.delete('/product/:id', auth ,deletarProdutos);

export default router;