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
    Book.countDocuments({}),
    BookInstance.countDocuments({}),
    BookInstance.countDocuments({ status: 'Available' }),
    Author.countDocuments({}),
    Genre.countDocuments({}),
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

exports.getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, 'title author')
    .sort({ title: 1 })
    .populate('author');

  res.status(200).render('bookList', {
    title: 'Book List',
    bookList: books,
  });
});

exports.getBookInstances = asyncHandler(async (req, res, next) => {
  const bookInstances = await BookInstance.find().populate('book');

  res.status(200).render('bookInstanceList', {
    title: 'Book Instance List',
    bookInstanceList: bookInstances,
  });
});

exports.getAuthors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find().sort({ familyName: 1 });

  res.status(200).render('authorList', {
    title: 'Author List',
    authorList: authors,
  });
});

exports.getGenres = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().sort({ name: 1 });

  res.status(200).render('genreList', {
    title: 'Genre List',
    genreList: genres,
  });
});
