const express = require("express");
const router = express.Router();
const Vacancy = require("../../models/Vacancy");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// @route   GET api/jobs/
// @desc    Test route
// @access  Public
router.get("/", async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json({ vacancies });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// @route   POST api/jobs/vacancies
// @desc    Test route
// @access  Public
router.post("/vacancies", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = decoded.user.id;

    const {
      organisation,
      contact_name,
      contact_details,
      title,
      field,
      salary,
      salary_period,
      ref,
      keywords,
      jd,
      apply_link,
      attachment_links,
    } = req.body;

    const existing = await Vacancy.findOne({ ref });

    if (existing) {
      res.status(401).json({
        errors: [{ msg: "A vacancy already exists with this reference" }],
      });
    }

    const vacancy = new Vacancy({
      user,
      organisation,
      contact_name,
      contact_details,
      title,
      field,
      salary,
      salary_period,
      ref,
      keywords,
      jd,
      apply_link,
      attachment_links,
    });

    await vacancy.save();

    return res.json({ vacancy });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
