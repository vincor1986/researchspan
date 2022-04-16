const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
const getReplyCommand = require("../../utils/getReplyCommand");
const deleteReplyHelper = require("../../utils/deleteReplyHelper");
const sendNotification = require("../../utils/sendNotification");
const getAuthUserId = require("../../utils/getAuthUserId");
const User = require("../../models/User");

// @route   GET api/discuss/
// @desc    Get post by search
// @access  Public
router.get("/", async (req, res) => {
  try {
    const qs = Boolean(req.query.question);
    const ds = Boolean(req.query.discussion);

    if (!req.query || !req.query.search || req.query.search === "") {
      const allPosts = await Post.find();

      return res.json({ results: allPosts });
    }

    const query = req.query.search.split(" ").map((val) => val.toLowerCase());

    let data = [],
      searchKeys = ["keywords", "main", "context"];

    for (let i = 0; i < query.length; i++) {
      const keyword = new RegExp(query[i], "gi");

      for (let j = 0; j < searchKeys.length; j++) {
        const key = searchKeys[j];
        const entryArray = await Post.find({ [key]: keyword });
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
    }

    if (!ds) {
      data = data.filter((obj) => obj.format !== "discussion");
    }
    if (!qs) {
      data = data.filter((obj) => obj.format !== "question");
    }

    console.log({ results: data });

    res.json({ results: data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/discuss/forum
// @desc    Get all discussion posts
// @access  Public
router.get("/forum", async (req, res) => {
  try {
    const forumPosts = await Post.find({ format: "discussion" });
    return res.json({ data: forumPosts });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   GET api/discuss/questions
// @desc    Get all question posts
// @access  Public
router.get("/questions", async (req, res) => {
  try {
    const allQuestions = await Post.find({ format: "question" });
    return res.json({ data: allQuestions });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   GET api/discuss/:id
// @desc    Get head post by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }
    return res.status(500).send("Server Error");
  }
});

// @route   POST api/discuss
// @desc    Create a new discussion or question post
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const user = getAuthUserId(req);

    const { format, keywords, main, context } = req.body;

    const { first_name, last_name, avatar, organisation, position, location } =
      await User.findById(user);

    const userObj = await User.findById(user);

    if (!first_name) {
      return res.status(404).json({
        errors: [
          { msg: "Something went wrong. Please try again in a short while." },
        ],
      });
    }

    const newPost = new Post({
      user,
      first_name,
      last_name,
      avatar,
      organisation,
      position,
      location,
      format,
      replyData: [{}],
      keywords,
      main,
      context,
      date: Date.now(),
      consensus_agree: [],
      consensus_disagree: [],
      recommended: [],
      responses: [],
    });

    newPost.head = newPost._id;

    userObj.discussion_id_array.push(newPost._id);

    await newPost.save();
    await userObj.save();

    return res.json(newPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/discuss/:head/:id
// @desc    Reply to a question, discussion or reply
// @access  Private
router.post("/:head/:id", auth, async (req, res) => {
  try {
    const headId = req.params.head;
    const postId = req.params.id;

    const user = getAuthUserId(req);

    const head = await Post.findById(headId);

    if (!head) {
      return res.status(400).json({
        errors: [{ msg: "Cannot reply to post, post does not exist" }],
      });
    }

    const { first_name, last_name, avatar, organisation, position, location } =
      await User.findById(user);

    if (!first_name) {
      return res.status(400).json({
        errors: [
          { msg: "Something went wrong, please try again in a short while" },
        ],
      });
    }

    const { format, main } = req.body;

    const newPost = new Post({
      user,
      first_name,
      last_name,
      avatar,
      organisation,
      position,
      location,
      head: headId,
      format,
      keywords: [],
      main,
      context: "",
      consensus_agree: [],
      consensus_disagree: [],
      recommended: [],
      responses: [],
      date: Date.now(),
    });

    if (headId === postId) {
      head.replyData[0][newPost._id] = [[head.responses.length], 0];
      head.responses.push(newPost);
    } else {
      const [targetIndexArray, replyCount] = head.replyData[0][postId];
      head.replyData[0][newPost._id] = [[...targetIndexArray, replyCount], 0];
      head.replyData[0][postId][1] = replyCount + 1;
      const commandString = getReplyCommand(targetIndexArray);
      eval(commandString);
    }

    head.markModified("responses");
    head.markModified("replyData");
    await head.save();

    const notificationParams = {
      type: format,
      sendingUserId: user,
      referenceId: headId,
      postId,
      head,
    };

    await sendNotification(notificationParams);

    return res.json(head);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: "Cannot reply to post, post does not exist" }],
      });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/discuss/:id
// @desc    Update / edit an existing discussion or question post
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const user = getAuthUserId(req);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(401).json({ errors: [{ msg: "Post not found" }] });
    }

    if (user !== post.user.toString()) {
      return res.status(401).json({
        errors: [{ msg: "You are not authorised to edit this post" }],
      });
    }

    const { format, keywords, main, context } = req.body;

    if (format && format !== post.format) {
      post.format = format;
    }
    if (
      keywords &&
      keywords.length > 0 &&
      keywords.toString() !== post.keywords.toString()
    ) {
      post.keywords = keywords;
    }
    if (main && main !== post.main) {
      post.main = main;
    }
    if (context && context !== post.context) {
      post.context = context;
    }

    post.edited = true;
    post.consensus_agree = [];
    post.consensus_disagree = [];
    post.last_edited = Date.now();

    await post.save();

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/discuss/consensus/:headId/:postId
// @desc    Toggle agree / disagree on post
// @access  Private
router.put("/consensus/:headId/:postId", auth, async (req, res) => {
  try {
    const headId = req.params.headId;
    const postId = req.params.postId;
    const userId = getAuthUserId(req);
    const response = req.query.response.replace(/"/g, "");

    if (response !== "agree" && response !== "disagree") {
      return res
        .status(400)
        .json({ errors: [{ msg: "Something went wrong" }] });
    }

    const head = await Post.findById(headId);

    let currentAgree, currentDisagree, path;
    if (headId === postId) {
      currentAgree = head.consensus_agree.map((id) => id.toString());
      currentDisagree = head.consensus_disagree.map((id) => id.toString());
    } else {
      const postIndexArray = head.replyData[0][postId][0];
      const middle = postIndexArray.map((index) => `.responses[${index}]`);
      path = "head" + middle.join("");
      currentAgree = eval(path + ".consensus_agree").map((id) => id.toString());
      currentDisagree = eval(path + ".consensus_disagree").map((id) =>
        id.toString()
      );
    }

    if (response === "agree") {
      if (currentDisagree.includes(userId)) {
        return res
          .status(401)
          .json({ msg: "You have already disagreed to this post" });
      }
      if (currentAgree.includes(userId)) {
        const indexOfUser = currentAgree.indexOf(userId);
        if (headId === postId) {
          head.consensus_agree.splice(indexOfUser, 1);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Agree removed" });
        } else {
          eval(path).consensus_agree.splice(indexOfUser, 1);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Agree removed" });
        }
      } else {
        if (headId === postId) {
          head.consensus_agree.push(userId);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Agree added" });
        } else {
          eval(path).consensus_agree.push(userId);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Agree added" });
        }
      }
    } else {
      if (currentAgree.includes(userId)) {
        return res
          .status(401)
          .json({ msg: "You have already Agreed to this post" });
      }
      if (currentDisagree.includes(userId)) {
        const indexOfUser = currentDisagree.indexOf(userId);
        if (headId === postId) {
          head.consensus_disagree.splice(indexOfUser, 1);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Disagree removed" });
        } else {
          eval(path).consensus_disagree.splice(indexOfUser, 1);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Disagree removed" });
        }
      } else {
        if (headId === postId) {
          head.consensus_disagree.push(userId);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Disagree added" });
        } else {
          eval(path).consensus_disagree.push(userId);
          head.markModified("responses");
          await head.save();
          return res.json({ msg: "Disagree added" });
        }
      }
    }
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   DELETE api/discuss/:head/:id
// @desc    Delete posts
// @access  Private
router.delete("/:head/:id", async (req, res) => {
  try {
    const headId = req.params.head;
    const postId = req.params.id;
    const authUserId = getAuthUserId(req);

    const head = await Post.findById(headId);

    if (!head) {
      return res.status(401).json({ errors: [{ msg: "Post not found" }] });
    }

    if (headId === postId) {
      if (authUserId !== head.user.toString()) {
        return res.status(401).json({
          errors: [{ msg: "You are not authorised to delete this post" }],
        });
      }

      await Post.findByIdAndDelete(headId);

      return res.json({ msg: "Post deleted" });
    } else {
      const indexArray = head.replyData[0][postId][0];
      const [postUser, delCommand] = deleteReplyHelper(head, indexArray);

      if (postUser !== authUserId) {
        return res.status(401).json({
          errors: [{ msg: "You are not authorised to delete this post" }],
        });
      }

      console.log(delCommand);
      console.log("trying to delete");

      eval(delCommand);
      delete head.replyData[0][postId];

      head.markModified("responses");
      head.markModified("replyData");
      await head.save();

      return res.json({ msg: "Post deleted" });
    }
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Post not found" }] });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
