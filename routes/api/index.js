// const path = require("path");
const router = require("express").Router();
const setlistRoutes = require("./setlist");
const authRoutes = require("./auth");
// const googleRoutes = require("./google");

// Setlist routes
router.use("/setlist", setlistRoutes);
router.use("/auth", authRoutes);

// // Google Routes
// router.use("/google", googleRoutes);

// For anything else, render the html page
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });

module.exports = router;
