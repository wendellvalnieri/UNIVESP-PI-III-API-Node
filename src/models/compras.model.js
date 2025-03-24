import pool from '../config/db.js';
import { verifyRequiredFields } from '../services/helpers.service.js'

const table = "compras";

const baseFields = [
    { field: "data_compra", defaultValue: new Date() },
    { field: "quantidade", defaultValue: 1 },
    { field: "preco_total", defaultValue: 1 },
    { field: "usuario_id", defaultValue: 0 },
];

const Model = {
    async create(data, user_id = 1) {
        delete data.csrfmiddlewaretoken;
        data.usuario_id = user_id;

        const keys = Object.keys(data);
        const values = Object.values(data);

        verifyRequiredFields(keys, values, baseFields);

        const query = `
          INSERT INTO ${table} (${keys.join(', ')}) 
          VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) 
          RETURNING *
        `;

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async findAll() {
        let query = `SELECT c.id,c.quantidade,c.preco,c.preco_total,
        c.data_compra,u.first_name as nome_cliente,cp.nome AS nome_produto FROM compras c
        LEFT JOIN auth_user u ON u.id = c.usuario_id
        LEFT JOIN core_produto cp ON cp.id = c.produto_id`;

        const result = await pool.query(query);
        return result.rows;
    },

    async findByUser(user = null) {
        let query = `SELECT c.id,c.quantidade,c.preco,c.preco_total,
        c.data_compra,u.first_name as nome_cliente,cp.nome AS nome_produto FROM compras c
        LEFT JOIN auth_user u ON u.id = c.usuario_id
        LEFT JOIN core_produto cp ON cp.id = c.produto_id`;

        if (!user.is_superuser) {
            query = query + ` where u.id = '${user.id}'`;
        }

        const result = await pool.query(query);
        return result.rows;
    },

    async findById(id) {
        const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async update(id, data) {
        data.modificado = new Date();

        const keys = Object.keys(data);
        const values = Object.values(data);

        const query = `
          UPDATE ${table} 
          SET ${keys.map((key, index) => `${key} = $${index + 1}`).join(', ')} 
          WHERE id = $${keys.length + 1} RETURNING * 
        `;

        values.push(id);

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async delete(id) {
        await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    }
};

export default Model;
