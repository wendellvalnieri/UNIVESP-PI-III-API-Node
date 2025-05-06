import pool from '../config/db.js';
import { verifyRequiredFields } from '../services/helpers.service.js'

const table = "reservas";

const baseFields = [
    { field: "data_criacao", defaultValue: new Date() },
    { field: "servico_id", defaultValue: 1 },
    { field: "usuario_id", defaultValue: 1 },
    { field: "data_reserva", defaultValue: new Date() },
    { field: "hora_reserva", defaultValue: new Date() },
    { field: "observacoes", defaultValue: "" },
    { field: "status", defaultValue: "agendado" },
];

const Model = {
    async create(data, id_user = 1) {
        delete data.csrfmiddlewaretoken;
        data.usuario_id = id_user;

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

    async cancelar(id) {
        const query = `update ${table} set status = 'cancelado' where id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    async findAll() {
        let query = `SELECT r.id,r.data_reserva,r.hora_reserva,a.first_name AS nome_usuario,cs.imagem,
        CASE WHEN r.data_reserva < CURRENT_DATE OR (r.data_reserva = CURRENT_DATE AND r.hora_reserva < CURRENT_TIME) THEN 'finalizado'
        ELSE r.status END AS status,cs.nome AS nome_servico,cs.preco FROM reservas r 
        LEFT JOIN auth_user a ON a.id = r.usuario_id 
        LEFT JOIN core_servico cs ON cs.id = r.servico_id ORDER BY r.data_reserva DESC, r.hora_reserva DESC `;
        const result = await pool.query(query);
        return result.rows;
    },

    async findByUser(user = null) {
        let query = `SELECT r.id,r.data_reserva,r.hora_reserva,a.first_name AS nome_usuario,cs.imagem,
                CASE 
                    WHEN r.data_reserva < CURRENT_DATE OR 
                         (r.data_reserva = CURRENT_DATE AND r.hora_reserva < CURRENT_TIME) 
                    THEN 'finalizado'
                    ELSE r.status
                END AS status,        
                cs.nome AS nome_servico,cs.preco,r.observacoes FROM reservas r
                LEFT JOIN auth_user a ON a.id = r.usuario_id
                LEFT JOIN core_servico cs ON cs.id = r.servico_id `;

        if (!user.is_superuser) {
            query = query + ` where a.id = '${user.id}' order by r.data_reserva desc, r.hora_reserva desc `;
        } else {
            query = query + ` order by r.data_reserva desc, r.hora_reserva desc `;
        }

        const result = await pool.query(query);
        return result.rows;
    },


    async findById(id) {
        const query = `SELECT r.*,cs.imagem,cs.nome AS nome_servico FROM ${table} r LEFT JOIN core_servico cs ON cs.id = r.servico_id WHERE r.id = $1`;
        const result = await pool.query(query, [id]);
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
