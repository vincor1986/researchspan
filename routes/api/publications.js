const express = require("express");
const router = express.Router();
const Publication = require("../../models/Publication");
const auth = require("../../middleware/auth");
const getAuthUserId = require("../../utils/getAuthUserId");
const User = require("../../models/User");
const sendNotification = require("../../utils/sendNotification");
const getArxivPapers = require("../../utils/getArxivPapers");
const getCrossrefData = require("../../utils/getCrossrefData");

// @route   GET api/publications/
// @desc    Get publications by search
// @access  Public
router.get("/", async (req, res) => {
  try {
    const queryStr = req.query.search;
    const query = req.query.search.split(" ").map((val) => val.toLowerCase());

    const cursor = req.query.cursor;

    let data = [],
      searchKeys = ["keywords", "field", "subcategories"];

    for (let i = 0; i < query.length; i++) {
      const keyword = new RegExp(query[i], "gi");

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

    const timeoutReturn = () =>
      res.status(500).json({
        errors: [
          { msg: "Something went wrong. Please try again in a short while." },
        ],
      });

    const timeout = setTimeout(timeoutReturn, 35000);

    const crossref = await getCrossrefData(queryStr, cursor).catch((err) =>
      console.error(err.message)
    );

    clearTimeout(timeout);

    const [totalResults, nextCursor, resultsPage] = crossref;

    res.json({
      data: {
        results: [...data, ...resultsPage],
        totalResults,
        nextCursor,
      },
    });
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
    await user.save();

    for (let i = 0; i < connectedUsers.length; i++) {
      const recipientId = connectedUsers[i];
      const notificationParams = {
        type: "confirm_coauthor",
        sendingUserId: userId,
        referenceId: publication._id,
        publication_title: publication.title,
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
          publication_title: publication.title,
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

// @route   PUT api/publications/confirm/:pubId
// @desc    Confirm coauthor status
// @access  Private
router.put("/confirm/:pubId", auth, async (req, res) => {
  const userId = getAuthUserId(req);
  const pubId = req.params.pubId;

  try {
    const add = Boolean(req.query.response);
    const publication = await Publication.findById(pubId);

    const userIndex = publication.pendingUsers
      .map((id) => id.toString())
      .indexOf(userId);

    if (userIndex === -1) {
      return res.status(404).json({ errors: [{ msg: "Not authorised" }] });
    }

    publication.pendingUsers.splice(userIndex, 1);

    if (add) {
      publication.connectedUsers.push(userId);
      const user = await User.findById(userId);
      user.pub_id_array.push(publication._id);
      await user.save();

      const notificationParams = {
        type: "coauthor_confirmed",
        sendingUserId: userId,
        recipientUserId: publication.user.toString(),
        referenceId: pubId,
        publication_title: publication.title,
      };

      await sendNotification(notificationParams);
    }

    await publication.save();

    return res.json(publication);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/publications/shortlist/:pubId
// @desc    Toggle vacancy in shortlist
// @access  Private
router.put("/shortlist/:pubId", auth, async (req, res) => {
  try {
    const pubId = req.params.pubId;
    const userId = getAuthUserId(req);
    const user = await User.findById(userId);

    const shortlistIndex = user.shortlist.publications
      .map((id) => id.toString())
      .indexOf(pubId);

    if (shortlistIndex === -1) {
      user.shortlist.publications.unshift(pubId);
      await user.save();
      return res.json({ msg: "Added publication to shortlist" });
    } else {
      user.shortlist.publications.splice(shortlistIndex, 1);
      await user.save();
      return res.json({ msg: "Removed publication from shortlist" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   DELETE api/publications/:pubId
// @desc    Delete publication
// @access  Private
router.delete("/:pubId", auth, async (req, res) => {
  const pubId = req.params.pubId;
  const userId = getAuthUserId(req);

  try {
    const publication = await Publication.findById(pubId);

    if (publication.user.toString() !== userId) {
      return res.status(401).json({ errors: [{ msg: "Not authorised" }] });
    }

    for (let i = 0; i < publication.connectedUsers.length; i++) {
      const connectedUserId = publication.connectedUsers[i];
      const connectedUser = await User.findById(connectedUserId);

      const idArrayIndex = connectedUser.pub_id_array
        .map((id) => id.toString())
        .indexOf(publication._id.toString());

      if (idArrayIndex === -1) continue;

      connectedUser.pub_id_array.splice(idArrayIndex, 1);
      await connectedUser.save();
    }

    for (let i = 0; i < publication.pendingUsers.length; i++) {
      const pendingUserId = publication.pendingUsers[i];
      const pendingUser = await User.findById(pendingUserId);

      const idArrayIndex = pendingUser.notifications
        .map((obj) => obj.reference)
        .indexOf(publication._id.toString());

      if (idArrayIndex === -1) continue;

      pendingUser.notifications.splice(idArrayIndex, 1);
      pendingUser.markModified("notifications");
      await pendingUser.save();
    }

    await Publication.findOneAndDelete({ _id: pubId });

    return res.json({ msg: "Publication deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
