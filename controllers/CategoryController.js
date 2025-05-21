
const db = require('../config/database');

exports.createTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS Category (
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Category table created...');
  });
};

exports.add = (req, res) => {
  const { name } = req.body;
  const sql = `INSERT INTO Category (name) VALUES (?)`;
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).send('Error adding category');
    res.send('Category added...');
  });
};

exports.update = (req, res) => {
  const { name } = req.body;
  const sql = `UPDATE Category SET name = ? WHERE id = ?`;
  db.query(sql, [name, req.params.id], (err, result) => {
    if (err) return res.status(500).send('Error updating category');
    res.send('Category updated...');
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM Category', (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get categories', result });
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM Category WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};


