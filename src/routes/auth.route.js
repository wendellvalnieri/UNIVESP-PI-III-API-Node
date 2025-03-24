import express from 'express';
import Controller from '../controllers/auth.controller.js';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 30, // Limite de 5 tentativas de login por IP
    message: 'Muitas tentativas de login. Tente novamente mais tarde.',
});

const router = express.Router();

router.post('/login',
    loginLimiter, 
    [
        body('username').isString().trim().notEmpty().withMessage('Username é obrigatório e deve ser uma string.'),
        body('password').isString().trim().notEmpty().withMessage('Password é obrigatório e deve ser uma string.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],
    Controller.login
);

export default router;
