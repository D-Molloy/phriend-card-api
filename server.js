require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')


const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 8081;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
// TODO: Setup CORS
app.use(cors())
// DB
mongoose.connect('mongodb://localhost/phriendcard', {
  useNewUrlParser: true,
  useFindAndModify: false,
  // added due to deprecation
  useUnifiedTopology: true,
});

// ROUTES
app.use(routes);

// Start the API server
app.listen(PORT, () => console.log(`🌎==> Listening on ${PORT}`));
