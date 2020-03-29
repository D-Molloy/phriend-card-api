const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");

// API Routes
router.use("/api", apiRoutes);
router.use("/auth", apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) =>
 res.status(404).send("Invalid endpoint")
  // res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
