const express = require("express");
const router = express.Router();

// Your route logic here
router.get("/", (req, res) => {
  res.send("AI Dashboard data");
});

module.exports = router;
