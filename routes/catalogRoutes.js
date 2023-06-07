const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

// catalog routes
router.get('/', catalogController.index);

router.route('/books').get(catalogController.getBooks);

router.route('/bookInstances').get(catalogController.getBookInstances);

router.route('/authors').get(catalogController.getAuthors);

router.route('/genres').get(catalogController.getGenres);

module.exports = router;
