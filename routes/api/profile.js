const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const Publication = require("../../models/Publication");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   GET api/profile/:id
// @desc    Get user profile
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = req.params.id;

    const profile = await Profile.findOne({ user });

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: "No profile found" }] });
    }

    const { first_name, last_name } = await User.findById(user);

    let publications = await Publication.find({ connectedUsers: user });

    if (!publications) {
      publications = [];
    }

    res.json({ ...profile._doc, first_name, last_name, publications });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/profile/:id
// @desc    Create user profile
// @access  Private
router.post("/:id", auth, async (req, res) => {
  const user = req.params.id;

  try {
    let profile = await Profile.findOne({ user });

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
      social,
    } = req.body;

    profile = new Profile({
      user,
      organisation,
      department,
      position,
      location,
      bio,
      interests,
      social,
    });

    await profile.save();

    const { first_name, last_name } = await User.findById(user);

    let publications = await Publication.find({ connectedUsers: user });

    res.json({ ...profile._doc, first_name, last_name, publications });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/profile/:id/publications
// @desc    Get all publications from a user
// @access  Public
router.get("/:id/publications", async (req, res) => {
  try {
    const user = req.params.id;

    const publications = await Publication.find({ connectedUser: user });

    if (!publications) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No publications were found" }] });
    }

    res.json({ publications });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/publications/:id
// @desc    Get a single publication
// @access  Public
router.get("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No publication found" }] });
    }

    res.json({ publication });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/profile/:id/publications
// @desc    Create publication entry
// @access  Private
router.post("/:id/publications", auth, async (req, res) => {
  const userId = req.params.id;

  try {
    let {
      title,
      type,
      journal,
      issue,
      colleagues,
      connectedUsers,
      DOI,
      PMID,
      link,
      date,
    } = req.body;

    connectedUsers.unshift(userId);

    let publication = new Publication({
      user: userId,
      title,
      type,
      journal,
      issue,
      colleagues,
      connectedUsers,
      DOI,
      PMID,
      link,
      date,
    });

    await publication.save();

    res.json({ publication });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
