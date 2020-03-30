// const db = require("../models");
// const axios = require('axios');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../utils/auth');
const { signupValidate } = require('../utils/validation');

// stored in DB
const users = [];
const posts = [
  {
    name: 'Denis',
    title: 'Post 1'
  },
  {
    name: 'Amanda',
    title: 'Post 2'
  }
];
let refreshTokens = [];

// const apiKey = process.env.PHISHNET_APIKEY;

// Defining methods for the bookController
module.exports = {
  create: async (req, res) => {
    const { username, email, password, password2 } = req.body;
    //TODO: VALIDATE ()
    //TODO: check DB to see if user already exists

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      //TODO: create user in DB
      // TODO: send hack user data?
      res.status(201).send({ username, email, hashedPassword });
    } catch (e) {
      console.log(`Error encrypting password`, e);
      res.status(500).send('Error encrypting password. Please try again.');
    }
  },
  login: async ({ body: { username, password } }, res) => {
    // check db to see if user exists
    const user = users.find(user => user.username === username);
    // if (!user) return res.status(400).send('Check credentials and try again');

    try {
      // compare submitted password and hashed password of found user
      if (await bcrypt.compare(password, user.hashedPassword)) {
        // user logged in
        // Create JWT
        const user = {
          username
        };

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // save refreshtokens in DB
        refreshTokens.push(refreshToken);

        // send the JWT to the user
        res.send({ accessToken, refreshToken });
      } else {
        res.status(400).send('Check credentials and try again');
      }
    } catch (e) {
      console.log('e - ', e);
      res.status(500).send('Please try again.');
    }
  }
};
