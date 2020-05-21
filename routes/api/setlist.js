const router = require('express').Router();
const setlistController = require('../../controllers/setlistController.js');
const { authenticateToken } = require('../../utils/auth');
// Matches with "/api/setlist/"
// router
//   .route("/")
//   .get(setlistController.findAll);

// Matches with "/api/setlist/"
// Add setlist to users shows array
router.route('/').post(authenticateToken, setlistController.addSetlistByDate);
router.route('/').get(authenticateToken, setlistController.getAllShowsForUser);

// Matches with "/api/setlist/"
// Delete setlist from users shows array
router
  .route('/:id')
  .delete(authenticateToken, setlistController.removeShowFromUser);

module.exports = router;
