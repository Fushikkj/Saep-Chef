import pg from 'pg';

const pool = new pg.pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export const query = (text, params) => pool.query(text, params);
