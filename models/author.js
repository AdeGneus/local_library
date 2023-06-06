const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide the first name'],
      maxLength: 100,
      trim: true,
    },
    familyName: {
      type: String,
      required: [true, 'Please provide the last name'],
      maxLength: 100,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    dateOfDeath: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for author's full name
authorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.firstName && this.familyName) {
    fullname = `${this.familyName}, ${this.firstName}`;
  }
  return fullname;
});

// Virtual for author's URL
authorSchema.virtual('url').get(function () {
  return `/catalog/authors/${this._id}`;
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
