require('dotenv').config();
const express = require('express');
const logger = require('morgan');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));


// ROUTES
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://user1:password1@ds125871.mlab.com:25871/heroku_0xn0jnk7",
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true
//   }
// );

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎==> Listening on ${PORT}`)
);