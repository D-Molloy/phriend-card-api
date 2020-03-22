const router = require("express").Router();
const setlistController = require("../../controllers/setlistController.js");

// Matches with "/api/setlist/"
router
  .route("/")
  .get(setlistController.findAll);

router
  .route("/:showDate")
  .get(setlistController.getSetlistByDate)

module.exports = router;
