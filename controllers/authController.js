const db = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/auth');
const { validateSignup, validateLogin } = require('../utils/validation');

// Defining methods for the bookController
module.exports = {
  create: async (req, res) => {
    // validate user info
    const { errors, userData } = validateSignup(req.body);
    if (!userData) {
      return res.status(400).json(errors);
    }
    //check if user already exists
    const foundUser = await db.User.findOne({ email: userData.email });
    if (foundUser) {
      return res
        .status(400)
        .json({ email: 'Email already associated with an account.' });
    }

    // create a new user
    try {
      // hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      // create user
      await db.User.create(userData);
      res.send('User created!');
    } catch (e) {
      res.status(500).send({
        message: 'Server error.  Please try again.',
        data: e.message,
      });
    }
  },
  login: async (req, res) => {
    // validate login creds
    const { errors, userData } = validateLogin(req.body);
    if (!userData) {
      return res.status(400).json(errors);
    }

    // Check if user exists
    const foundUser = await db.User.findOne({ email: userData.email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: 'Email not registered. Please create an account.' });
    }

    // Check password
    if (await bcrypt.compare(userData.password, foundUser.password)) {
      // user logged in
      // Create JWT
      foundUser.password = null;
      console.log('foundUser', foundUser);
      const token = generateAccessToken(foundUser);
      // send the JWT to the user
      return res.send({ token });
    } else {
      // bad password
      return res.status(403).json({
        message: 'Please check credentials and try again',
      });
    }
  },
  // refreshToken: (req, res) => {
  //   const refreshToken = req.body.token;
  //   if (!refreshToken) return res.status(401);
  //   // refreshToken should be saved in DB
  //   if (!refreshTokens.includes(refreshToken)) return res.status(403);
  //   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.status(403);
  //     const accessToken = generateAccessToken({ name: user.username });
  //     // TODO: need to include refresh token as well? `const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);`

  //     res.json({ accessToken });
  //   });
  // },
  // logout: (req, res) => {
  //   if (!req.body.token) return res.sendStatus(400);
  //   // remove from DB
  //   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  //   res.sendStatus(204);
  // },
};
