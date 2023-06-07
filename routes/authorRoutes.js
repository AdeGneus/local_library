const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router
  .route('/create')
  .get(authorController.getCreateAuthor)
  .post(authorController.postCreateAuthor);

router.route('/:id').get(authorController.getAuthor);
// .patch(authorController.updateAuthor)
// .delete(authorController.deleteAuthor);

module.exports = router;
