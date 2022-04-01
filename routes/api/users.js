const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const getAuthUserId = require("../../utils/getAuthUserId");
const Profile = require("../../models/Profile");
const Publication = require("../../models/Publication");

// @route   GET api/users/
// @desc    Get users by search
// @access  Public
router.get("/", async (req, res) => {
  try {
    if (!req.query.search) {
      const allUsers = await User.find();
      if (!allUsers) {
        return res.status(500).json({
          errors: [
            { msg: "Something went wrong. Please try again in a while" },
          ],
        });
      }
      return res.json({ data: allUsers });
    }

    const query = req.query.search.split(" ").map((val) => val.toLowerCase());

    let data = [];
    const userSearchKeys = ["first_name", "last_name"],
      profileSearchKeys = [
        "organisation",
        "department",
        "position",
        "location",
        "interests",
      ],
      pubSearchKeys = ["title", "field", "subcategories", "keywords"];

    // Search for loop over each search term
    for (let i = 0; i < query.length; i++) {
      const keyword = new RegExp(query[i], "gi");

      // Publication search
      for (let j = 0; j < pubSearchKeys.length; j++) {
        const key = pubSearchKeys[j];
        const entryArray = await Publication.find({ [key]: keyword });
        if (entryArray.length === 0) continue;

        const users = [];
        for (let k = 0; k < entryArray.length; k++) {
          const pub = entryArray[k];
          for (let l = 0; l < pub.connectedUsers.length; l++) {
            users.push(await User.findById(pub.connectedUsers[l].toString()));
          }
        }

        users.forEach((entry) => {
          if (
            !data[0] ||
            data.filter((obj) => obj._id.toString() === entry.id.toString())
              .length === 0
          ) {
            data.push(entry);
          }
        });
      }

      // User search
      for (let j = 0; j < userSearchKeys.length; j++) {
        const key = userSearchKeys[j];
        const entryArray = await User.find({ [key]: keyword });
        if (entryArray.length === 0) continue;
        entryArray.forEach((entry) => {
          if (
            !data[0] ||
            data.filter((obj) => obj._id.toString() === entry.id.toString())
              .length === 0
          ) {
            data.push(entry);
          }
        });
      }

      // Profile search
      for (let j = 0; j < profileSearchKeys.length; j++) {
        const key = profileSearchKeys[j];
        const entryArray = await Profile.find({ [key]: keyword });
        if (entryArray.length === 0) continue;

        const users = [];
        for (let k = 0; k < entryArray.length; k++) {
          users.push(await User.findById(entryArray[k].user.toString()));
        }

        users.forEach((entry) => {
          if (
            !data[0] ||
            data.filter((obj) => obj._id.toString() === entry.id.toString())
              .length === 0
          ) {
            data.push(entry);
          }
        });
      }
    }

    res.json(data);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("first_name", "Name is required").not().isEmpty(),
    check("last_name", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email address").isEmail(),
    check(
      "password",
      "Please provide a password of 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        first_name,
        last_name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }
      return res.status(500).send("Server error");
    }
  }
);

//@Route    DELETE api/users/deleteaccount
//@Desc     Delete account
//@Access   Private
router.delete(
  "/deleteaccount",
  [auth, [check("password", "Password is required").exists()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const authUserId = getAuthUserId(req);
      const user = await User.findById(authUserId);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const profile = await Profile.find({ user: authUserId });

      for (let i = 0; i < user.pub_id_array.length; i++) {
        const pubId = user.pub_id_array[i];
        const publication = await Publication.findById(pubId);

        if (publication.user.toString() === authUserId) {
          await Publication.findOneAndDelete(pubId);
        } else {
          const arrayIndex = publication.connectedUsers
            .map((id) => id.toString())
            .indexOf(authUserId);
          publication.connectedUsers.splice(arrayIndex, 1);
          publication.coauthors.push(
            `${user.last_name.toUpperCase}, ${user.first_name}`
          );
          await publication.save();
        }
      }

      if (profile) {
        await Profile.findByIdAndDelete(profile._id);
      }
      await User.findByIdAndDelete(authUserId);

      return res.json({ msg: "Account deleted" });
    } catch (err) {
      console.error(err);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
