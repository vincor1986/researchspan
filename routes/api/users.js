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
      return res.status(500).send("Server error");
    }
  }
);

//@Route    DELETE api/users/deleteaccount
//@Desc     Delete account
//@Access   Private
router.delete("/deleteaccount", auth, async (req, res) => {
  try {
    const authUserId = getAuthUserId(req);
    const user = await User.findById(authUserId);
    const profile = await Profile.find({ user: authUserId });

    for (let i = 0; i < user.pub_id_array.length; i++) {
      const pubIndex = user.pub_id_array[i];
      const publication = await Publication.findById(pubIndex);
      const arrayIndex = publication.connectedUsers.indexOf(authUserId);
      publication.connectedUsers.splice(arrayIndex, 1);
      publication.coauthors.push(`${user.first_name} ${user.last_name}`);
      await publication.save();
    }
    if (profile) {
      await Profile.findByIdAndDelete(profile._id);
    }
    await User.findByIdAndDelete(authUserId);

    return res.json({ msg: "Account deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
