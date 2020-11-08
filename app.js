const express = require('express');
const port = 8080;
const routes = require('./routes');
const mongoose = require('mongoose');
const {setup} = require('./test/utils');
const { ValidationError, NotFoundError } = require('./lib/errors');

const app = express();
// mongoose.connect(setup);

mongoose.set('debug', true);

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

setup().then(() => {
  console.log("server started at", port)
  app.listen(port)
})



module.exports = app;