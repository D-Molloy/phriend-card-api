const router = require('express').Router();
const setlistController = require('../../controllers/setlistController.js');
const { authenticateToken } = require('../../utils/auth');
// Matches with "/api/setlist/"
// router
//   .route("/")
//   .get(setlistController.findAll);

// Matches with "/api/setlist/"
router.route('/').post(authenticateToken, setlistController.addSetlistByDate);

router
  .route('/:id')
  .delete(authenticateToken, setlistController.removeShowFromUser);

module.exports = router;
