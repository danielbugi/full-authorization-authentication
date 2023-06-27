const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const userRouter = require('./userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>server is running :)</h1>');
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Sorry, can't find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
