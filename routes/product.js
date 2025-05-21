
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/create', ProductController.createTable);
router.get('/', ProductController.getAll);
router.get('/desc', ProductController.getDesc);
router.get('/id/:id', ProductController.getById);
router.get('/withCategories', ProductController.getWithCategories);
router.get('/:name', ProductController.searchByName);
router.post('/', ProductController.add);
router.put('/id/:id', ProductController.update);
router.delete('/id/:id', ProductController.delete);

module.exports = router;

