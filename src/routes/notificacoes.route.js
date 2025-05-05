import express from 'express';
import Controller from '../controllers/notificacoes.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', Controller.sendNotificationRest);
router.post('/register-token', authMiddleware, Controller.registerToken);
//router.post('/', authMiddleware, Controller.sendNotificationRest);
router.post('/fcm', authMiddleware, Controller.sendNotification);

export default router;