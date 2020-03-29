const router = require("express").Router();
const setlistController = require("../../controllers/setlistController.js");

// Matches with "/api/setlist/"
// router
//   .route("/")
//   .get(setlistController.findAll);


// Matches with "/api/setlist/yyyy-mm-dd"
router
  .route("/:showDate")
  .post(setlistController.addSetlistByDate)

module.exports = router;
