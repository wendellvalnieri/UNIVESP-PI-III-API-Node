import jwt from 'jsonwebtoken';
import { response_generic } from './responseHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_pass';

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    // Verifica se o token começa com 'Bearer ' e o remove
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim(); // Remove 'Bearer ' do token
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Armazena as informações do usuário no request
        next();
    } catch (err) {
        response_generic(res, 401, false, 'Token inválido ou expirado.', err);
    }

};

export default authMiddleware;