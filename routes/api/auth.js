const router = require('express').Router();
const authController = require('../../controllers/authController.js');
const { authenticateToken, middlewareTest } = require('../../utils/auth');
// const bcrypt = require('bcrypt');
// Matches with POST "/api/auth/create"
router.route('/create').post(authController.create);

// Matches with POST "/api/auth/login"
router.route('/login').post(authController.login);

// Matches with "/api/setlist/yyyy-mm-dd"
// router
//   .route("/:showDate")
//   .post(authController.addSetlistByDate)

module.exports = router;
