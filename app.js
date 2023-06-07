/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const indexRouter = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');
const catalogRouter = require('./routes/catalogRoutes');
const bookRouter = require('./routes/bookRoutes');
const authorRouter = require('./routes/authorRoutes');
const genreRouter = require('./routes/genreRoutes');
const bookInstanceRouter = require('./routes/bookInstanceRoutes');

const app = express();

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/catalog', catalogRouter);
app.use('/catalog/books', bookRouter);
app.use('/catalog/authors', authorRouter);
app.use('/catalog/genres', genreRouter);
app.use('/catalog/bookInstances', bookInstanceRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
