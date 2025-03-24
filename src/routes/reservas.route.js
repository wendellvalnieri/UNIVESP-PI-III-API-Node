import express from 'express';
import ReservasController from '../controllers/reservas.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, ReservasController.create);
router.put('/:id', authMiddleware, ReservasController.update);
router.delete('/:id', authMiddleware, ReservasController.delete);

router.get('/', ReservasController.getAll);
router.get('/byUser', authMiddleware, ReservasController.getByUser);
router.get('/:id', authMiddleware, ReservasController.getById);

export default router;
