import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

export default createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
