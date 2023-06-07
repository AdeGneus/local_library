/* eslint-disable import/no-extraneous-dependencies */
const { body, validationResult } = require('express-validator');
const Genre = require('../models/genre');
const Book = require('../models/book');
const asyncHandler = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

exports.getGenre = asyncHandler(async (req, res, next) => {
  // Get details of genre and all associated books (in parallel)
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id),
    Book.find({ genre: req.params.id }, 'title summary'),
  ]);

  if (genre === null) {
    // No results
    return next(AppError('Genre not found', 404));
  }

  res.status(200).render('genreDetail', {
    title: 'Genre Detail',
    genre,
    genreBooks: booksInGenre,
  });
});

exports.getCreateGenre = (req, res, next) => {
  res.render('genreForm', { title: 'Create Genre' });
};

exports.postCreateGenre = [
  // Validate and sanitize the name field.
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.render('genreForm', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      });
    }
    // Data from form is valid.
    // Check if Genre with same name already exists.
    const genreExists = await Genre.findOne({ name: req.body.name });
    if (genreExists) {
      // Genre exists, redirect to its detail page.
      return res.redirect(genreExists.url);
    }
    await genre.save();
    // New genre saved. Redirect to genre detail page.
    res.redirect(genre.url);
  }),
];

exports.updateGenre = async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
};

exports.deleteGenre = async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
};
