import mysql from "mysql2/promise";

const sslEnabled = process.env.DB_SSL === 'true';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '15715', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(sslEnabled ? {
        ssl: {
            rejectUnauthorized: false
        }
    } : {})
});

export default db;
