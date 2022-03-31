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

    res.json({
      data: { ...profile._doc, first_name, last_name, publications },
    });
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

    res.json({
      data: { ...profile._doc, first_name, last_name, publications },
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
  const user = req.params.id;

  const authUserId = getAuthUserId(req);

  if (authUserId !== user) {
    res.status(401).json({
      errors: [{ msg: "You are not authorised to make these changes" }],
    });
  }

  try {
    let profile = await Profile.findOne({ user });

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

    await profile.save();

    const { first_name, last_name } = await User.findById(user);

    let publications = await Publication.find({ connectedUsers: user });

    res.json({
      data: { ...profile._doc, first_name, last_name, publications },
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
    const user = req.params.id;

    const publications = await Publication.find({ connectedUsers: user });

    if (!publications) {
      return res
        .status(400)
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

// @route   POST api/profile/:id/publications
// @desc    Create publication entry
// @access  Private
router.post("/:id/publications", auth, async (req, res) => {
  const userId = req.params.id;

  try {
    let {
      title,
      type,
      field,
      subcategories,
      keywords,
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
      field,
      subcategories,
      keywords,
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

    connectedUsers.forEach(async (connectedUserId) => {
      let userEntry = await User.findById(connectedUserId);
      userEntry.pub_id_array.push(publication._id.toString());
      await userEntry.save();
    });

    res.json({ data: publication });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
