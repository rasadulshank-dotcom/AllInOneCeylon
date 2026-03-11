require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.qpixmhuxytywegdisubc',
  host: 'aws-1-ap-northeast-1.pooler.supabase.com',
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});



module.exports = pool;

