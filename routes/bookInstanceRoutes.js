const express = require('express');
const bookInstanceController = require('../controllers/bookInstanceController');

const router = express.Router();

router
  .route('/create')
  .get(bookInstanceController.getCreateBookInstance)
  .post(bookInstanceController.postCreateBookInstance);

router.route('/:id').get(bookInstanceController.getBookInstance);
// .patch(bookInstanceController.updateBookInstance)
// .delete(bookInstanceController.deleteBookInstance);
module.exports = router;
