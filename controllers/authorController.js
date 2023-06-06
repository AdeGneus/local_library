const Author = require('../models/author');
const asyncHandler = require('../utils/asyncErrorHandler');

exports.getAllAuthors = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Not yet implemented',
  });
});

exports.getAuthor = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
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
