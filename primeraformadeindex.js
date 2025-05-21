
const express = require("express")
const app = express()
const mysql = require('mysql2')
app.use(express.json())
const PORT = 3000

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'node_express_sql' 
})

db.connect()

app.get('/createdb', (req, res) => {
 const sql = 'CREATE DATABASE node_express_sql'

 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Database created...')

 })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


// Crea las siguientes tablas usando Express y MySQL como hemos visto en clase:
// Tabla Products
// Tabla Categories


app.get('/createTableProduct', (req, res) => {
    
 const sql =
   'CREATE TABLE IF NOT EXISTS Product (id INT AUTO_INCREMENT,name VARCHAR(255) NOT NULL,price DECIMAL(10,2),PRIMARY KEY(id));'
 
   db.query(sql, (err, result) => {

   if (err) throw err
   console.log(result)
   res.send('Product table created...')

 })
})


app.get('/createTableCategory', (req, res) => {

 const sql =
   'CREATE TABLE IF NOT EXISTS Category (id INT AUTO_INCREMENT,name VARCHAR(255) NOT NULL,PRIMARY KEY(id));'
 
   db.query(sql, (err, result) => {

   if (err) throw err
   console.log(result)
   res.send('Category table created...')

 })
})


app.get('/createTableProductCategory', (req, res) => {

 const sql =
   'CREATE TABLE IF NOT EXISTS ProductCategory (product_id INT,category_id INT, PRIMARY KEY(product_id, category_id), FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE, FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE);'
 
   db.query(sql, (err, result) => {

   if (err) throw err
   console.log(result)
   res.send('ProductCategory table created...')

 })
})


// Crea un endpoint para añadir un producto nuevo y añade 2 productos nuevos desde postman

app.post('/addProduct', (req, res) => {

  const sql = `INSERT INTO Product (name, price)
    VALUES 
    ('${req.body.name}', ${req.body.price});`;

  db.query(sql, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).send('Error adding product');

    }
    console.log(result);
    res.send('Product added...');

  });
});


// Crea un endpoint para crear una categoría y añade 2 categorías nuevas desde postman

app.post('/addCategory', (req, res) => {

  const sql = `INSERT INTO Category (name)
    VALUES ('${req.body.name}');`;

  db.query(sql, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).send('Error adding category');
    }

    console.log(result);
    res.send('Category added...');
    
  });
});


// Crea un endpoint para actualizar un producto. 

app.put('/products/id/:id', (req, res) => {

  const { name, price } = req.body;
  const sql = `UPDATE Product SET name = '${name}', price = ${price} WHERE id = ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating product');
    }
    res.send('Product updated...');

  });
});


// Crea un endpoint para actualizar una categoría.

app.put('/categories/id/:id', (req, res) => {

  const { name } = req.body;
  const sql = `UPDATE Category SET name = '${name}' WHERE id = ${req.params.id}`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating category');
    }
    res.send('Category updated...');

  });
});


// Crea un endpoint que muestre todos los productos

app.get('/products', (req, res) => {

  const sql = 'SELECT * FROM Product';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get products', result });

  });
});


// Crea un endpoint que muestre todas las categorías

app.get('/categories', (req, res) => {

  const sql = 'SELECT * FROM Category';

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Get categories', result });

  });
});


// Crea un endpoint que muestra todos los productos con sus categorías

app.get('/productsWithCategories', (req, res) => {

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
});


// Crea un endpoint donde puedas seleccionar un producto por id

app.get('/products/id/:id', (req, res) => {

  const sql = `SELECT * FROM Product WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});


// Crea un endpoint que muestre de forma descendente los productos.

app.get('/products/desc', (req, res) => {

  const sql = 'SELECT * FROM Product ORDER BY id DESC';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});


// Crea un endpoint donde puedas seleccionar una categoría por id

app.get('/categories/id/:id', (req, res) => {

  const sql = `SELECT * FROM Category WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});


// Crea un endpoint donde puedas buscar un producto por su nombre

app.get('/products/:name', (req, res) => {

  const name = req.params.name;
  const sql = `SELECT * FROM Product WHERE name LIKE '%${name}%'`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);

  });
});


// Crea un endpoint donde puedas eliminar un producto por su id

app.delete('/products/id/:id', (req, res) => {

  const sql = `DELETE FROM Product WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting product');
    }

    res.send('Product deleted...');
  });
});


