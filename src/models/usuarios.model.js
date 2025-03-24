import { verifyRequiredFields } from '../services/helpers.service.js'
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const table = "auth_user";

const baseFields = [
    { field: "password", defaultValue: "" },
    { field: "last_login", defaultValue: null },
    { field: "is_superuser", defaultValue: false },
    { field: "username", defaultValue: "" },
    { field: "first_name", defaultValue: "" },
    { field: "last_name", defaultValue: "" },
    { field: "email", defaultValue: "" },
    { field: "is_staff", defaultValue: false },
    { field: "is_active", defaultValue: true },
    { field: "date_joined", defaultValue: new Date() }
];

const Model = {
    async create(data) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

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
