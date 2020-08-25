require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 8081;
const allowedOrigins = [
  'http://localhost:8080',
  'https://phriendscore.netlify.app'
];

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      console.log('origin: ', origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
// DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/phriendcard', {
  useNewUrlParser: true,
  useFindAndModify: false,
  // added due to deprecation
  useUnifiedTopology: true,
});

// ROUTES
app.use(routes);

// Start the API server
app.listen(PORT, () => console.log(`🌎==> Listening on ${PORT}`));
