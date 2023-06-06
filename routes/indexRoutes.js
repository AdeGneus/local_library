const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

// GET home page.
router.route('/').get(indexController.index);

module.exports = router;
