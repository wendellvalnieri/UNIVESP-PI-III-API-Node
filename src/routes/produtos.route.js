import express from 'express';
import ProdutoController from '../controllers/produtos.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/', authMiddleware, ProdutoController.create);
router.put('/:id', authMiddleware, ProdutoController.update);
router.delete('/:id', authMiddleware, ProdutoController.delete);

router.get('/', ProdutoController.getAll);
router.get('/:id', ProdutoController.getById);

export default router;
