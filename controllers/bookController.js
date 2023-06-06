const Book = require('../models/book');
const asyncHandler = require('../utils/asyncErrorHandler');

exports.getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, 'title author')
    .sort({ title: 1 })
    .populate('author');

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      data: books,
    },
  });
});

exports.getBook = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
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
