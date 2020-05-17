const db = require('../models');
const bcrypt = require('bcrypt');

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
  login: async ({ body: { username, password } }, res) => {
    // check db to see if user exists
    const user = users.find((user) => user.username === username);
    // if (!user) return res.status(400).send('Check credentials and try again');

    try {
      // compare submitted password and hashed password of found user
      if (await bcrypt.compare(password, user.hashedPassword)) {
        // user logged in
        // Create JWT
        const user = {
          username,
        };

        const accessToken = generateAccessToken(user);
        // TODO: decide whether to give refreshToken or not.
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // save refreshtokens in DB
        refreshTokens.push(refreshToken);

        // send the JWT to the user
        // res.send({ accessToken, refreshToken });
        res.send({ accessToken, refreshToken });
      } else {
        res.status(400).send('Check credentials and try again');
      }
    } catch (e) {
      console.log('e - ', e);
      res.status(500).send('Please try again.');
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401);
    // refreshToken should be saved in DB
    if (!refreshTokens.includes(refreshToken)) return res.status(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403);
      const accessToken = generateAccessToken({ name: user.username });
      // TODO: need to include refresh token as well? `const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);`

      res.json({ accessToken });
    });
  },
  logout: (req, res) => {
    if (!req.body.token) return res.sendStatus(400);
    // remove from DB
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
  },
};
