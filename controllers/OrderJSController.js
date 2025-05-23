
const db = require('../config/database');

exports.createTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS OrderJS (
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('OrderJS table created...');
  });
};

exports.add = (req, res) => {
  const {name} = req.body;
  const sql = `INSERT INTO OrderJS (name) VALUES (?)`;
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).send('Error adding product');
    res.send('Order added...');
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM OrderJS', (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get orders', result });
  });
};



