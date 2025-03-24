import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';

let token, id;

beforeAll(async () => {
    await pool.query('TRUNCATE TABLE core_servico RESTART IDENTITY');

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
    await pool.end();
});

describe('servicos API', () => {
    it('should create a new servico', async () => {
        const res = await request(app)
            .post('/servicos')
            .auth(token, { type: 'bearer' })
            .send({
                nome: "servico 1",
                descricao: "servico 1",
                preco: 10.99
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('servico 1');
        id = res.body.id;
    });
    it('should get all servicos', async () => {
        const res = await request(app)
            .get('/servicos')
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(200);
    });

    it('should get a servico by ID', async () => {
        const res = await request(app)
            .get(`/servicos/${id}`)
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(id);
    });

    it('should update a servico', async () => {
        const res = await request(app)
            .put(`/servicos/${id}`)
            .auth(token, { type: 'bearer' })  // Autenticação com o token
            .send({
                nome: "servico Atualizado",
                preco: 15.99,
                descricao: "Descrição atualizada do servico",
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('servico Atualizado');
    });

    it('should delete a servico', async () => {
        const res = await request(app)
            .delete(`/servicos/${id}`)
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(204);
    });
});