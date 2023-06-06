const express = require('express');
const bookInstanceController = require('../controllers/bookInstanceController');

const router = express.Router();

router
  .route('/')
  .get(bookInstanceController.getAllBookInstances)
  .post(bookInstanceController.createBookInstance);

router
  .route('/:id')
  .get(bookInstanceController.getBookInstance)
  .patch(bookInstanceController.updateBookInstance)
  .delete(bookInstanceController.deleteBookInstance);

module.exports = router;
