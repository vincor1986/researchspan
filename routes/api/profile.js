const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   GET api/profile/:id
// @desc    Get user profile
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: "No profile found" }] });
    }

    const { first_name, last_name } = await User.findById(req.params.id);

    res.json({ ...profile._doc, first_name, last_name });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/profile/:id
// @desc    Create user profile
// @access  Private
router.post("/:id", auth, async (req, res) => {
  const userId = req.params.id;

  try {
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      return res
        .status(400)
        .json({ errors: [{ msg: "A profile already exists for this user" }] });
    }

    const {
      organisation,
      department,
      position,
      location,
      bio,
      interests,
      publications,
      social,
    } = req.body;

    profile = new Profile({
      user: userId,
      organisation,
      department,
      position,
      location,
      bio,
      interests,
      publications,
      social,
    });

    await profile.save();

    const { first_name, last_name } = await User.findById(req.params.id);

    res.json({ ...profile._doc, first_name, last_name });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
