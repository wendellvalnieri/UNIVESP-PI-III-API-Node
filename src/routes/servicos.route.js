import express from 'express';
import ServicoController from '../controllers/servicos.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, ServicoController.create);
router.put('/:id', authMiddleware, ServicoController.update);
router.delete('/:id', authMiddleware, ServicoController.delete);

router.get('/', ServicoController.getAll);
router.get('/:id', ServicoController.getById);

export default router;
