const router = require("express").Router();
const authController = require("../../controllers/authController.js");
const {authenticateToken, middlewareTest} = require('../../utils/auth');
// const bcrypt = require('bcrypt');
// Matches with POST "/api/auth/create"
router
  .route("/create")
  .post(middlewareTest, authController.create);


// Matches with "/api/setlist/yyyy-mm-dd"
// router
//   .route("/:showDate")
//   .post(authController.addSetlistByDate)

module.exports = router;
