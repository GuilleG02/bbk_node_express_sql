
const db = require('../config/database');

exports.createProductCategoryTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS ProductCategory (
      product_id INT,
      category_id INT,
      PRIMARY KEY(product_id, category_id),
      FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
    )
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('ProductCategory table created...');
  });
};

