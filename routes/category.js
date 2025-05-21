
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/create', CategoryController.createTable);
router.get('/', CategoryController.getAll);
router.get('/id/:id', CategoryController.getById);
router.post('/', CategoryController.add);
router.put('/id/:id', CategoryController.update);

module.exports = router;

