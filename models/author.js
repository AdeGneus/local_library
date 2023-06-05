const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide the first name'],
    maxLength: 100,
    trim: true,
  },
  family_name: {
    type: String,
    required: [true, 'Please provide the last name'],
    maxLength: 100,
    trim: true,
  },
  date_of_birth: {
    type: Date,
  },
  date_of_death: {
    type: Date,
  },
});

// Virtual for author's full name
authorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual for author's URL
authorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;