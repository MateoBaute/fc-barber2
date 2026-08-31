import mysql from "mysql2/promise";

function getEnv(name: string, required = true): string {
    const value = process.env[name];
    if (!value || value === '') {
        if (required) {
            throw new Error(`Missing environment variable: ${name}`);
        }
        return '';
    }

    const prefix = `${name}=`;
    return value.startsWith(prefix) ? value.slice(prefix.length) : value;
}

const sslEnabled = (process.env.DB_SSL ?? 'false').toLowerCase() === 'true';

const db = mysql.createPool({
    host: getEnv('DB_HOST'),
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    user: getEnv('DB_USER'),
    password: getEnv('DB_PASSWORD', false),
    database: getEnv('DB_NAME'),
    ...(sslEnabled
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {}),
});

export default db;
