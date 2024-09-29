import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  user: 'lore',
  password: '123456',
  database: 'joyas',
  port: 5432,
  allowExitOnIdle: true,
});