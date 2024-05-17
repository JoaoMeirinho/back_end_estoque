import express from 'express';
import { cadastrarUsuario, login } from '../controllers/userController';

const router = express.Router();

router.post('/user', cadastrarUsuario);
router.post('/user/login', login);
export default router;