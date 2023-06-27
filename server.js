process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
});
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD))
  .then(console.log('successfully connected to database!'));

const port = 3000 || process.env.PORT;

const server = app.listen(port, () => {
  console.log(`listening on port : ${port}`);
  console.log(process.env.NODE_ENV);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
