const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name of the genre'],
    minLength: 3,
    maxLength: 100,
    trim: true,
  },
});

// Virtual for genre's URL
genreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
