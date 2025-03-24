import pool from '../config/db.js';
import { verifyRequiredFields, createSlug } from '../services/helpers.service.js'

const table = "core_servico";

const baseFields = [
    { field: "criado", defaultValue: new Date() },
    { field: "modificado", defaultValue: new Date() },
    { field: "ativo", defaultValue: false },
    { field: "nome", defaultValue: "" },
    { field: "descricao", defaultValue: "" },
    { field: "preco", defaultValue: 0.0 },
    { field: "imagem", defaultValue: "" },
    { field: "slug", defaultValue: "" },
];

const Model = {
    async create(data) {
        data.slug = createSlug(data.nome);

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

    async reserva(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        verifyRequiredFields(keys, values, baseFields);

        const query = `
          INSERT INTO reservas(${keys.join(', ')}) 
          VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) 
          RETURNING *
        `;

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async findAll() {
        const result = await pool.query(`SELECT * FROM ${table}`);
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
          WHERE id = $${keys.length + 1}  RETURNING *
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
