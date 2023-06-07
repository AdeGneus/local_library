const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router
  .route('/create')
  .get(genreController.getCreateGenre)
  .post(genreController.postCreateGenre);

router.route('/:id').get(genreController.getGenre);
// .patch(genreController.updateGenre)
// .delete(genreController.deleteGenre);

module.exports = router;
