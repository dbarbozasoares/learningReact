const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

router.get("/", (req, res) => {
  res.json({ message: "API WORKING" });
});

module.exports = router;
