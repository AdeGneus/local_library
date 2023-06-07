// eslint-disable-next-line import/no-extraneous-dependencies
const { body, validationResult } = require('express-validator');
const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const asyncHandler = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

// Display BookInstance create form on GET.
exports.getCreateBookInstance = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, 'title');

  res.render('bookInstanceForm', {
    title: 'Create BookInstance',
    bookList: books,
  });
});

// Handle BookInstance create on POST.
exports.postCreateBookInstance = [
  // Validate and sanitize fields.
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueacBk,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const books = await Book.find({}, 'title');

      return res.render('bookInstanceForm', {
        title: 'Create BookInstance',
        bookList: books,
        selectedBook: bookInstance.book._id,
        errors: errors.array(),
        bookInstance,
      });
    }
    // Data from form is valid
    await bookInstance.save();
    res.redirect(bookInstance.url);
  }),
];

exports.getBookInstance = asyncHandler(async (req, res, next) => {
  // Display detail page for a specific BookInstance.
  const bookInstance = await BookInstance.findById(req.params.id).populate(
    'book'
  );

  if (bookInstance === null) {
    // No results
    return next(AppError('Book copy not found', 404));
  }

  res.render('bookInstanceDetail', {
    title: 'Book:',
    bookInstance,
  });
});

exports.createBookInstance = asyncHandler(async (req, res, next) => {
  res.status(201).json({ status: 'success', data: 'Not yet implemented' });
});

exports.updateBookInstance = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});

exports.deleteBookInstance = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});
