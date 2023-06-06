const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');

const asyncHandler = require('../utils/asyncErrorHandler');

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: 'Available' }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.status(200).render('index', {
    title: 'Local Library Home',
    bookCount: numBooks,
    bookInstanceCount: numBookInstances,
    bookInstanceAvailableCount: numAvailableBookInstances,
    authorCount: numAuthors,
    genreCount: numGenres,
  });
});
