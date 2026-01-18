const express = require('express');
const {Pool} = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Pool koneksi PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Middleware untuk parsing JSON
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// HEALTH CHECK (WAJIB DEVOPS)
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ok', database: 'up' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'down' });
  }
});

//Root endpoint
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send('Inventory App is running. Database  time: ' + result.rows[0].now);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error');
  }
});

// READ: Get all products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// CREATE: Add a new product
app.post('/products', express.json(), async (req, res) => {
  const {name, quantity, price} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding product');
  }
});

// UPDATE: Update a product
app.put('/products/:id', express.json(), async (req, res) => {
  const {id} = req.params;
  const {name, quantity, price} = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, quantity, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

// DELETE: Delete a product by id 
app.delete('/products/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`Inventory app is running on http://localhost:${PORT}`);
});
