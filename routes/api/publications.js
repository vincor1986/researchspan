const express = require("express");
const router = express.Router();
const Publication = require("../../models/Publication");

// @route   GET api/publications/
// @desc    Get publications by search
// @access  Public
router.get("/", async (req, res) => {
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
});

// @route   GET api/publications/:id
// @desc    Get a single publication
// @access  Public
router.get("/:id", async (req, res) => {
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

module.exports = router;
