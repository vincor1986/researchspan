const express = require("express");
const router = express.Router();
const Publication = require("../../models/Publication");
const auth = require("../../middleware/auth");
const getAuthUserId = require("../../utils/getAuthUserId");
const User = require("../../models/User");
const sendNotification = require("../../utils/sendNotification");

// @route   GET api/publications/
// @desc    Get publications by search
// @access  Public
router.get("/", async (req, res) => {
  try {
    const query = req.query.search.split(" ").map((val) => val.toLowerCase());

    let data = [],
      searchKeys = ["keywords", "field", "subcategories"];

    for (let i = 0; i < query.length; i++) {
      const keyword = query[i];

      for (let j = 0; j < searchKeys.length; j++) {
        const key = searchKeys[j];
        const entryArray = await Publication.find({ [key]: keyword });
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

    data = data.filter((obj) =>
      query.every(
        (item) =>
          obj.keywords.includes(item) ||
          obj.field.match(item) ||
          obj.subcategories.includes(item)
      )
    );

    res.json({ data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/publications/:id
// @desc    Get a single publication by id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No publication found" }] });
    }

    res.json(publication);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/publications/:id/confirm
// @desc    Confirm co-authorship of publication
// @access  Private
router.get("/:id/confirm", auth, async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    const user = await User.findById(userId);
    const publication = await Publication.findById(req.params.id);

    const pendingUsers = publication.pendingUsers.map((id) => id.toString());
    const indexOfUser = pendingUsers.indexOf(userId);

    if (indexOfUser === -1) {
      return res.status(401).json({ errors: [{ msg: "Not authorised" }] });
    }

    publication.connectedUsers.push(userId);
    publication.pendingUsers.splice(indexOfUser, 1);

    user.pub_id_array.push(publication._id);

    await publication.save();
    await user.save();

    return res.json({
      msg: "You have been added as a co-author for this publication",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   POST api/publications/new
// @desc    Create publication entry
// @access  Private
router.post("/new", auth, async (req, res) => {
  const userId = getAuthUserId(req);
  const user = await User.findById(userId);

  try {
    let {
      title,
      type,
      field,
      subcategories,
      keywords,
      journal,
      issue,
      coauthors,
      connectedUsers,
      DOI,
      PMID,
      link,
      date,
    } = req.body;

    let publication = new Publication({
      user: userId,
      title,
      type,
      field,
      subcategories,
      keywords,
      journal,
      issue,
      coauthors,
      pendingUsers: connectedUsers,
      DOI,
      PMID,
      link,
      date,
    });

    publication.connectedUsers.unshift(userId);
    user.pub_id_array.push(publication._id);

    await publication.save();

    for (let i = 0; i < connectedUsers.length; i++) {
      const recipientId = connectedUsers[i];
      const notificationParams = {
        type: "confirm_coauthor",
        sendingUserId: userId,
        referenceId: publication._id,
        recipientUserId: recipientId,
      };
      await sendNotification(notificationParams);
    }

    res.json(publication);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/publications/:pubId
// @desc    Edit existing publication
// @access  Private
router.put("/:pubId", auth, async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    const pubId = req.params.pubId;

    const publication = await Publication.findById(pubId);

    if (publication.user.toString() !== userId) {
      return res.status(401).json({ errors: [{ msg: "Not authorised" }] });
    }

    let {
      title,
      type,
      field,
      subcategories,
      keywords,
      journal,
      issue,
      coauthors,
      connectedUsers,
      DOI,
      PMID,
      link,
      date,
    } = req.body;

    const existingConnected = [
      ...publication.connectedUsers.map((id) => id.toString()),
      ...publication.pendingUsers.map((id) => id.toString()),
    ];

    publication.pendingUsers = publication.pendingUsers.filter((pendingUser) =>
      connectedUsers.includes(pendingUser)
    );

    const remove = existingConnected.filter(
      (existingUser) => !connectedUsers.includes(existingUser)
    );

    if (title && title !== publication.title) {
      publication.title = title;
    }
    if (type && type !== publication.type) {
      publication.type = type;
    }
    if (field && field !== publication.field) {
      publication.field = field;
    }
    if (
      subcategories &&
      subcategories.toString() !== publication.subcategories.toString()
    ) {
      publication.subcategories = subcategories;
    }
    if (keywords && keywords.toString() !== publication.keywords.toString()) {
      publication.keywords = keywords;
    }
    if (journal && journal !== publication.journal) {
      publication.journal = journal;
    }
    if (issue && issue !== publication.issue) {
      publication.issue = issue;
    }
    if (
      coauthors &&
      coauthors.toString() !== publication.coauthors.toString()
    ) {
      publication.coauthors = coauthors;
    }

    publication.connectedUsers = publication.connectedUsers.filter(
      (existingConnected) => !remove.includes(existingConnected.toString())
    );

    if (DOI && DOI !== publication.DOI) {
      publication.DOI = DOI;
    }
    if (PMID && PMID !== publication.PMID) {
      publication.PMID = PMID;
    }
    if (link && link !== publication.link) {
      publication.link = link;
    }
    if (date && date !== publication.date) {
      publication.date = date;
    }

    for (let i = 0; i < connectedUsers.length; i++) {
      const newUserId = connectedUsers[i];
      if (!existingConnected.includes(newUserId)) {
        const notificationParams = {
          type: "confirm_coauthor",
          sendingUserId: userId,
          referenceId: publication._id,
          recipientUserId: newUserId,
        };
        await sendNotification(notificationParams);
        publication.pendingUsers.push(newUserId);
      }
    }

    await publication.save();

    res.json(publication);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
