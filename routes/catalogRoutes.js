const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

// catalog routes
router.get('/', catalogController.index);

router.route('/books').get(catalogController.getBooks);
router.route('/books/:id').get(catalogController.getBook);

router.route('/bookInstances').get(catalogController.getBookInstances);
router.route('/bookInstances/:id').get(catalogController.getBookInstance);

router.route('/authors').get(catalogController.getAuthors);
router.route('/authors/:id').get(catalogController.getAuthor);

router.route('/genres').get(catalogController.getGenres);
router.route('/genres/:id').get(catalogController.getGenre);

module.exports = router;
