const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router
  .route('/create')
  .get(bookController.getCreateBook)
  .post(bookController.postCreateBook);

router.route('/:id').get(bookController.getBook);
// .patch(bookController.updateBook)
// .delete(bookController.deleteBook);

module.exports = router;
