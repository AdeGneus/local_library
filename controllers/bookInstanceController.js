const BookInstance = require('../models/bookInstance');
const asyncHandler = require('../utils/asyncErrorHandler');

exports.getAllBookInstances = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Not yet implemented',
  });
});

exports.getBookInstance = asyncHandler(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Not yet implemented' });
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
