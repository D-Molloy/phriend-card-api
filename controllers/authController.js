// const db = require("../models");
// const axios = require('axios');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../utils/auth');
const { signupValidate } = require('../utils/validation');

// const apiKey = process.env.PHISHNET_APIKEY;

// Defining methods for the bookController
module.exports = {
  create: async function(req, res) {
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
  }
};
