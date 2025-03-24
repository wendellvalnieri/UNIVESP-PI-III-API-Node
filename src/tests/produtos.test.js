import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';

let token, id;

beforeAll(async () => {
    await pool.query('TRUNCATE TABLE core_produto RESTART IDENTITY');

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

describe('Produtos API', () => {
    it('should create a new produto', async () => {
        const res = await request(app)
            .post('/produtos')
            .auth(token, { type: 'bearer' })
            .send({
                nome: "Produto 1",
                descricao: "Produto 1",
                preco: 10.99,
                estoque: 100
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Produto 1');
        id = res.body.id;
    });
    it('should get all produtos', async () => {
        const res = await request(app)
            .get('/produtos')
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(200);
    });

    it('should get a produto by ID', async () => {
        const res = await request(app)
            .get(`/produtos/${id}`)
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toBe(id);
    });

    it('should update a produto', async () => {
        const res = await request(app)
            .put(`/produtos/${id}`)
            .auth(token, { type: 'bearer' })  // Autenticação com o token
            .send({
                nome: "Produto Atualizado",
                preco: 15.99,
                descricao: "Descrição atualizada do produto",
                estoque: 150
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Produto Atualizado');
    });

    it('should delete a produto', async () => {
        const res = await request(app)
            .delete(`/produtos/${id}`)
            .auth(token, { type: 'bearer' });  // Autenticação com o token

        expect(res.statusCode).toEqual(204);
    });
});