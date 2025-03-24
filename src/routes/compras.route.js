import express from 'express';
import ComprasController from '../controllers/compras.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, ComprasController.create);
router.put('/:id', authMiddleware, ComprasController.update);
router.delete('/:id', authMiddleware, ComprasController.delete);

router.get('/', ComprasController.getAll);
router.get('/byUser', authMiddleware, ComprasController.getByUser);
router.get('/:id', authMiddleware, ComprasController.getById);

export default router;
