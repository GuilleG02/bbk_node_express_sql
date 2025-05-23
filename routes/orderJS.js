
const express = require('express');
const router = express.Router();
const OrderJSController = require('../controllers/OrderJSController');

router.get('/create', OrderJSController.createTable);
router.get('/', OrderJSController.getAll);
router.post('/', OrderJSController.add);


module.exports = router;
