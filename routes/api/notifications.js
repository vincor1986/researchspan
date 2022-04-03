const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const getAuthUserId = require("../../utils/getAuthUserId");
const auth = require("../../middleware/auth");

// @route   GET api/notifications/
// @desc    Get all notifications
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    const user = await User.findById(userId);
    res.json(user.notifications);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/notification/toggle
// @desc    Toggle read status of notification
// @access  Private
router.put("/toggle", auth, async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.json(400).errors({ errors: [{ msg: "something went wrong" }] });
  }

  try {
    const userId = getAuthUserId(req);
    const user = await User.findById(userId);

    const notificationIndex = user.notifications
      .map((obj) => obj.notificationId)
      .indexOf(id);

    if (notificationIndex === -1) {
      return res.status(404).json({ errors: [{ msg: "not found" }] });
    }

    user.notifications[notificationIndex].unread =
      !user.notifications[notificationIndex].unread;

    user.markModified("notifications");
    await user.save();

    return res.status(200).json({ msg: "toggled read status" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
