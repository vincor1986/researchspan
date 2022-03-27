const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const getNestedReplyString = require("../../utils/getNestedReplyString");

// @route   POST api/discuss
// @desc    Create a new discussion or question post
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = decoded.user.id;

    const { format, keywords, main, context, date } = req.body;

    const newPost = new Post({
      user,
      format,
      keywords,
      main,
      context,
      date,
      consensus_agree: [],
      consensus_disagree: [],
      recommended: [],
      responses: [],
    });

    newPost.head = newPost._id;

    await newPost.save();

    return res.json({ data: newPost });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/discuss/:head/:id
// @desc    Reply to a question, discussion or reply post
// @access  Private
router.post("/:head/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const headId = req.params.head;

    const head = await Post.findById(req.params.head);

    if (!head) {
      return res.status(400).json({
        errors: [{ msg: "Cannot reply to post, post does not exist" }],
      });
    }

    const commandString = getNestedReplyString(head, postId);

    if (!commandString) {
      return res.status(400).json({
        errors: [{ msg: "Cannot reply to post, post does not exist" }],
      });
    }

    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = decoded.user.id;

    const { format, main, date } = req.body;

    const newPost = new Post({
      user,
      format,
      keywords: [],
      main,
      context: "",
      date,
      consensus_agree: [],
      consensus_disagree: [],
      recommended: [],
      responses: [],
    });

    if (headId === postId) {
      head.responses.push(newPost);
    } else {
      console.log(commandString);
      eval(commandString);
    }

    head.markModified("responses");
    await head.save();

    return res.json({ data: head });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
