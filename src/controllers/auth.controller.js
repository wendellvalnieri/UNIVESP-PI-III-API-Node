import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_pass';
const table = "auth_user";

const Controller = {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            // Consulta segura com parâmetros para evitar SQL Injection
            const result = await pool.query(`SELECT * FROM ${table} WHERE username = $1`, [username]);
            const usuario = result.rows[0];

            // Verificação se o usuário existe
            if (!usuario) {
                // Retorna uma mensagem genérica para evitar enumeração de usuários
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Verificação de senha usando bcrypt
            const senhaCorreta = await bcrypt.compare(password, usuario.password);
            if (!senhaCorreta) {
                // Retorna uma mensagem genérica se a senha estiver incorreta
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Geração do token JWT
            const token = jwt.sign(
                { id: usuario.id, is_superuser: usuario.is_superuser },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            const final = {
                success: true,
                message: 'Login efetuado com sucesso',
                data: {
                    token: token,
                    is_superuser: usuario.is_superuser,
                    is_staff: usuario.is_staff,
                    email: usuario.email,
                    nome: usuario.first_name,
                },
            }

            return res.status(200).json(final);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }
};

export default Controller;