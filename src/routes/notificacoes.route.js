import express from 'express';
import Controller from '../controllers/notificacoes.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, Controller);

export default router;
