const express = require("express");
const router = express.Router();

// Import user routes
const userRoutes = require("./UserRoutes");

// Use the user routes
router.use("/api/users", userRoutes);

// Test route
router.get("/", (req, res) => {
  res.json({ message: "API WORKING" });
});

module.exports = router;
