const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const Publication = require("../../models/Publication");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const getAuthUserId = require("../../utils/getAuthUserId");

// @route   GET api/profile/:id
// @desc    Get user profile
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: "No profile found" }] });
    }

    const { first_name, last_name, pub_id_array, avatar } = await User.findById(
      userId
    );

    let publications = [];

    for (let i = 0; i < pub_id_array.length; i++) {
      const pubId = pub_id_array[i];
      const newPublication = await Publication.findById(pubId);
      publications.push(newPublication);
    }

    res.json({ ...profile._doc, first_name, last_name, publications, avatar });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "No profile found" }] });
    }
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
      social,
    });

    let user = await User.findById(userId);

    if (organisation) {
      user.organisation = organisation;
    }
    if (department) {
      user.department = department;
    }
    if (position) {
      user.position = position;
    }
    if (location) {
      user.location = location;
    }

    user.profileId = profile._id;

    let publications = [];

    for (let i = 0; i < user.pub_id_array.length; i++) {
      const pubId = user.pub_id_array[i];
      const newPublication = await Publication.findById(pubId);
      publications.push(newPublication);
    }

    await profile.save();
    await user.save();

    res.json({
      ...profile._doc,
      first_name: user.first_name,
      last_name: user.last_name,
      publications: publications,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "No profile found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/:id
// @desc    Update user profile
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const userId = req.params.id;

  const authUserId = getAuthUserId(req);

  if (authUserId !== userId) {
    res.status(401).json({
      errors: [{ msg: "You are not authorised to make these changes" }],
    });
  }

  try {
    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(400).json({
        errors: [{ msg: "A profile doesn't yet exist for this user" }],
      });
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

    if (organisation && organisation !== profile.organisation) {
      profile.organisation = organisation;
    }
    if (department && department !== profile.department) {
      profile.department = department;
    }
    if (position && position !== profile.position) {
      profile.position = position;
    }
    if (location && location !== profile.location) {
      profile.location = location;
    }
    if (bio && bio !== profile.bio) {
      profile.bio = bio;
    }
    if (interests && interests.toString() !== profile.interests.toString()) {
      profile.interests = interests;
    }
    if (social.linkedin && social.linkedin !== profile.social.linkedin) {
      profile.social.linkedin = social.linkedin;
    }
    if (
      social.researchgate &&
      social.researchgate !== profile.social.researchgate
    ) {
      profile.social.researchgate = social.researchgate;
    }
    if (social.facebook && social.facebook !== profile.social.facebook) {
      profile.social.facebook = social.facebook;
    }
    if (social.twitter && social.twitter !== profile.social.twitter) {
      profile.social.twitter = social.twitter;
    }

    let user = await User.findById(userId);

    if (organisation && organisation !== user.organisation) {
      user.organisation = organisation;
    }
    if (department && department !== user.department) {
      user.department = department;
    }
    if (position && position !== user.position) {
      user.position = position;
    }
    if (location && location !== user.location) {
      user.location = location;
    }

    await profile.save();
    await user.save();

    let publications = [];

    for (let i = 0; i < user.pub_id_array.length; i++) {
      const pubId = user.pub_id_array[i];
      const newPublication = await Publication.findById(pubId);
      publications.push(newPublication);
    }

    res.json({
      ...profile._doc,
      first_name: user.first_name,
      last_name: user.last_name,
      publications,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "No profile found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   GET api/profile/:id/publications
// @desc    Get all publications from a user
// @access  Public
router.get("/:id/publications", async (req, res) => {
  try {
    const userId = req.params.id;

    const { pub_id_array } = await User.findById(userId);

    let publications = [];

    for (let i = 0; i < pub_id_array.length; i++) {
      const pubId = pub_id_array[i];
      const newPublication = await Publication.findById(pubId);
      publications.push(newPublication);
    }

    if (!publications) {
      return res
        .status(404)
        .json({ errors: [{ msg: "No publications were found" }] });
    }

    res.json({ data: publications });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "No user found" }] });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
