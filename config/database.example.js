
const mysql = require('mysql2');

const db = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;

