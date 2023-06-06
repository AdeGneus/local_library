const Genre = require('../models/genre');
const Book = require('../models/book');
const asyncHandler = require('../utils/asyncErrorHandler');

exports.getAllGenres = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Not yet implemented',
  });
});

exports.getGenre = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});

exports.createGenre = asyncHandler(async (req, res, next) => {
  res.status(201).json({ status: 'success', data: 'Not yet implemented' });
});

exports.updateGenre = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});

exports.deleteGenre = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
});
