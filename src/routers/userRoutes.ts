import express from 'express';
import { cadastrarUsuario } from '../controllers/userController';

const router = express.Router();

router.post('/user', cadastrarUsuario);

export default router;