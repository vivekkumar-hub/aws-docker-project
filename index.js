const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database Connection Configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'myappdb',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>App Connected to DB!</h1><p>Database Time: ${result.rows[0].now}</p>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error!');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
