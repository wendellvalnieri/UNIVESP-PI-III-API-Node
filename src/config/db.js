import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const connectToDB = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Connected to the PostgreSQL database successfully' + ': ' + process.env.DB_HOST);
    } catch (error) {
        console.error('Error connecting to the PostgreSQL database:', error.message);
    }
};

export default pool;
