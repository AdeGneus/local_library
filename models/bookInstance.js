const mongoose = require('mongoose');

const bookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  imprint: {
    type: String,
    required: [true, 'Please provide the imprint'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for bookInstance's URL
bookInstanceSchema.virtual('url').get(function () {
  return `/catalog/bookInstance/${this._id}`;
});

const BookInstance = mongoose.model('BookInstance', bookInstanceSchema);

module.exports = BookInstance;
