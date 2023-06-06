const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookInstance');

const asyncHandler = require('../utils/asyncErrorHandler');
const AppError = require('../utils/appError');

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

exports.getBookInstances = asyncHandler(async (req, res, next) => {
  const bookInstances = await BookInstance.find().populate('book');

  res.status(200).render('bookInstanceList', {
    title: 'Book Instance List',
    bookInstanceList: bookInstances,
  });
});

exports.getBookInstance = asyncHandler(async (req, res, next) => {
  // Display detail page for a specific BookInstance.
  const bookInstance = await BookInstance.findById(req.params.id).populate(
    'book'
  );

  if (bookInstance === null) {
    // No results
    return next(AppError('Book copy not found', 404));
  }

  res.status(200).render('bookInstanceDetail', {
    title: 'Book:',
    bookInstance,
  });
});

exports.getAuthors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find().sort({ familyName: 1 });

  res.status(200).render('authorList', {
    title: 'Author List',
    authorList: authors,
  });
});

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

exports.getGenres = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().sort({ name: 1 });

  res.status(200).render('genreList', {
    title: 'Genre List',
    genreList: genres,
  });
});

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
