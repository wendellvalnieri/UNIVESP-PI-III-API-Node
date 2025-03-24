import express from 'express';
import UsuariosController from '../controllers/usuarios.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/:id', authMiddleware, UsuariosController.update);
router.delete('/:id', authMiddleware, UsuariosController.delete);

router.post('/', UsuariosController.create);
router.get('/', UsuariosController.getAll);
router.get('/:id', UsuariosController.getById);

export default router;
