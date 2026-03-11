require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { createSchema, createTable } = require('./schema');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/login', async (req, res) => {
  try {
    const email = "rasal@example1.com";
    const password = "password1";

    const result = await pool.query(
      `INSERT INTO authe.users (email, password_hash)
       VALUES ($1, $2)
       RETURNING *`,
      [email, password]
    );

    res.json({
      message: 'User created',
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

createSchema();
createTable();


// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
