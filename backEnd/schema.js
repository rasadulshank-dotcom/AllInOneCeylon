const pool = require('./db');

async function createSchema(){
  try {
    await pool.query(`
      CREATE SCHEMA IF NOT EXISTS authe;
    `);

    console.log('✅ Schema "authe" created (or already exists)');
  } catch (err) {
    console.error('❌ Error creating schema');
    console.error(err.message);
  }
}

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS authe.users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Table created');
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { createSchema, createTable };
