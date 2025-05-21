
const db = require('../config/database');

exports.createTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS Product (
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2),
      PRIMARY KEY(id)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Product table created...');
  });
};

exports.add = (req, res) => {
  const { name, price } = req.body;
  const sql = `INSERT INTO Product (name, price) VALUES (?, ?)`;
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).send('Error adding product');
    res.send('Product added...');
  });
};

exports.update = (req, res) => {
  const { name, price } = req.body;
  const sql = `UPDATE Product SET name = ?, price = ? WHERE id = ?`;
  db.query(sql, [name, price, req.params.id], (err, result) => {
    if (err) return res.status(500).send('Error updating product');
    res.send('Product updated...');
  });
};

exports.delete = (req, res) => {
  const sql = `DELETE FROM Product WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send('Error deleting product');
    res.send('Product deleted...');
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM Product', (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get products', result });
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM Product WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.getDesc = (req, res) => {
  db.query('SELECT * FROM Product ORDER BY id DESC', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.searchByName = (req, res) => {
  const sql = `SELECT * FROM Product WHERE name LIKE ?`;
  db.query(sql, [`%${req.params.name}%`], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

exports.getWithCategories = (req, res) => {
  const sql = `
    SELECT 
      Product.id AS product_id,
      Product.name AS product_name,
      Product.price,
      Category.id AS category_id,
      Category.name AS category_name
    FROM Product
    JOIN ProductCategory ON Product.id = ProductCategory.product_id
    JOIN Category ON ProductCategory.category_id = Category.id
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get products with categories', result });
  });
};


