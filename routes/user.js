
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/create', UserController.createTable);
router.get('/', UserController.getAll);
router.post('/', UserController.add);


module.exports = router;
