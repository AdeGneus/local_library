// eslint-disable-next-line import/no-extraneous-dependencies
const { body, validationResult } = require('express-validator');
const Author = require('../models/author');
const Book = require('../models/book');
const asyncHandler = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

// Display Author create form on GET.
exports.getCreateAuthor = (req, res, next) => {
  res.render('authorForm', { title: 'Create Author' });
};

// Handle Author create on POST.
exports.postCreateAuthor = [
  // Validate and sanitize fields.
  body('firstName').isLength({ min: 1 }).escape(),

  body('familyName').isLength({ min: 1 }).escape(),

  body('dateOfBirth', 'Invalid date of birth')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('dateOfDeath', 'Invalid date of death')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const author = new Author({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      return res.render('authorForm', {
        title: 'Create Author',
        author: author,
        errors: errors.array(),
      });
    }
    // Data from form is valid.

    // Save author.
    await author.save();
    // Redirect to new author record.
    res.redirect(author.url);
  }),
];

exports.getAuthor = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, booksByAuthor] = await Promise.all([
    Author.findById(req.params.id),
    Book.find({ author: req.params.id }, 'title summary'),
  ]);

  if (author === null) {
    // No results
    return next(AppError('Author not found', 404));
  }

  res.status(200).render('authorDetail', {
    title: 'Author Detail',
    author,
    authorBooks: booksByAuthor,
  });
});

exports.getAllAuthors = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Not yet implemented',
  });
});

exports.createAuthor = asyncHandler(async (req, res, next) => {
  res.status(201).json({ status: 'success', data: 'Not yet implemented' });
});

exports.updateAuthor = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});

exports.deleteAuthor = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});
