const express = require("express");
const router = express.Router();

// @route   GET api/discussions
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Discussions route"));

module.exports = router;
