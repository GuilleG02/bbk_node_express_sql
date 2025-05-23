
const db = require('../config/database');

exports.createTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY(id)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('User table created...');
  });
};

exports.add = (req, res) => {
  const {name} = req.body;
  const sql = `INSERT INTO User (name) VALUES (?)`;
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).send('Error adding product');
    res.send('User added...');
  });
};

exports.getAll = (req, res) => {
  db.query('SELECT * FROM User', (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get User', result });
  });
};


