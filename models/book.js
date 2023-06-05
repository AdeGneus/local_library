const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the title of the book'],
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: {
    type: String,
    required: [true, 'Please provide the summary of the book'],
  },
  isbn: {
    type: String,
    required: [true, 'Please provide the isbn'],
  },
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    },
  ],
});

// Virtual for book's URL
bookSchema.virtual('url').get(function () {
  return `/catalog/book/${this._id}`;
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
