import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';

let token, id;

beforeAll(async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({
            username: 'usuario123',
            password: 'senha123'
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
});

afterAll(async () => {
    await pool.end();  // Fecha a conexão com o banco de dados
    if (global.server && global.server.close) {
        global.server.close();  // Fecha o servidor caso ele esteja rodando
    }
});

describe('usuarios API', () => {
    it('should create a new usuario', async () => {
        const res = await request(app)
            .post('/usuarios')
            .auth(token, { type: 'bearer' })
            .send({
                password: "senha123",
                is_superuser: false,
                username: "usuario1233",
                first_name: "João",
                last_name: "Silva",
                email: "joao.silva@email.com",
                is_staff: false,
                is_active: true
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.username).toBe('usuario1233');
        id = res.body.id;
    });

    it('should get all usuarios', async () => {
        const res = await request(app)
            .get('/usuarios')
            .auth(token, { type: 'bearer' });

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);  // Verifica se é uma lista de usuários
    });

    it('should get a usuario by ID', async () => {
        const res = await request(app)
            .get(`/usuarios/${id}`)
            .auth(token, { type: 'bearer' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(id);
        expect(res.body).toHaveProperty('username');
    });

    it('should update a usuario', async () => {
        const res = await request(app)
            .put(`/usuarios/${id}`)
            .auth(token, { type: 'bearer' })
            .send({
                first_name: "usuario Atualizado",
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.first_name).toBe('usuario Atualizado');
    });

    it('should delete a usuario', async () => {
        const res = await request(app)
            .delete(`/usuarios/${id}`)
            .auth(token, { type: 'bearer' });

        expect(res.statusCode).toEqual(204);
    });
});