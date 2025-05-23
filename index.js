
const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./config/database');

app.use(express.json());

app.get('/createdb', (req, res) => {
 const sql = 'CREATE DATABASE node_express_sql'

 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Database created...')

 })
})

app.use('/product', require('./routes/product'));
app.use('/category', require('./routes/category'));

app.use('/user', require('./routes/user'));
app.use('/orderJS', require('./routes/orderJS'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

