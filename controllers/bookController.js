// eslint-disable-next-line import/no-extraneous-dependencies
const { body, validationResult } = require('express-validator');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');

const asyncHandler = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

// Display book create form on GET.
exports.getCreateBook = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  const [authors, genres] = await Promise.all([Author.find(), Genre.find()]);

  res.render('bookForm', {
    title: 'Create Book',
    authors,
    genres,
  });
});

exports.postCreateBook = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and sanitize fields.
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      const [authors, genres] = await Promise.all([
        Author.find(),
        Genre.find(),
      ]);

      // Mark our selected genres as checked.
      genres.forEach((genre) => {
        if (book.genre.indexOf(genre._id) > -1) {
          // eslint-disable-next-line no-param-reassign
          genre.checked = 'true';
        }
      });

      return res.render('bookForm', {
        title: 'Create Book',
        authors,
        genres,
        book,
        errors: errors.array(),
      });
    }
    // Data from form is valid. Save book.
    await book.save();
    res.redirect(book.url);
  }),
];

// exports.getAllBooks = asyncHandler(async (req, res, next) => {
//   const books = await Book.find({}, 'title author')
//     .sort({ title: 1 })
//     .populate('author');

//   res.status(200).json({
//     status: 'success',
//     results: books.length,
//     data: {
//       data: books,
//     },
//   });
// });

exports.getBook = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre'),
    BookInstance.find({ book: req.params.id }),
  ]);

  if (book === null) {
    // No results
    return next(AppError('Book not found', 404));
  }

  res.status(200).render('bookDetail', {
    title: 'Book Detail',
    book,
    bookInstances,
  });
});

exports.createBook = asyncHandler(async (req, res, next) => {
  res.status(201).json({ status: 'success', data: 'Not yet implemented' });
});

exports.updateBook = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});
