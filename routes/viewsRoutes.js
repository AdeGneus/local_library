const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

// GET home page.
router.route('/').get(viewsController.index);

router.route('/books').get(viewsController.books);

module.exports = router;
