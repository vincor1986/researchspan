const express = require("express");
const router = express.Router();
const Vacancy = require("../../models/Vacancy");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const getAuthUserId = require("../../utils/getAuthUserId");

// @route   GET api/jobs/
// @desc    Get vacancies by search
// @access  Public
router.get("/", async (req, res) => {
  try {
    if (!req.query.search) {
      const allJobs = await Vacancy.find();
      if (!allJobs) {
        return res.status(404).json({
          errors: [{ msg: "No current vacancies were found" }],
        });
      }
      return res.json({ data: allJobs });
    }

    const query = req.query.search.split(" ").map((val) => val.toLowerCase());

    const currency = req.query.currency;

    let data = [],
      idArray = [];
    const vacancySearchKeys = [
      "title",
      "field",
      "location",
      "keywords",
      "jd",
      "organisation",
    ];

    // Search for loop over each search term
    for (let i = 0; i < query.length; i++) {
      const keyword = new RegExp(query[i], "gi");

      // Vacancies search
      for (let j = 0; j < vacancySearchKeys.length; j++) {
        const key = vacancySearchKeys[j];
        const entryArray = await Vacancy.find({ [key]: keyword });
        if (entryArray.length === 0) continue;

        for (let k = 0; k < entryArray.length; k++) {
          const entry = entryArray[k];
          const entryId = entry._id.toString();

          if (!idArray.includes(entryId)) {
            data.push(entry);
            idArray.push(entryId);
          }
        }
      }
    }

    data = Array.from(new Set(data));

    if (currency !== "Any") {
      data = data.filter((obj) => obj.salary_currency === currency);
    }

    res.json({ data });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   GET api/jobs/vacancies/:id
// @desc    Get vacancy listing by id
// @access  Public
router.get("/vacancies/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }

    return res.json(vacancy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }
    return res.status(500).send("Server Error");
  }
});

// @route   POST api/jobs/vacancies
// @desc    Create job vacancy listing
// @access  Private
router.post("/vacancies", auth, async (req, res) => {
  try {
    const user = getAuthUserId(req);

    const {
      organisation,
      contact_name,
      contact_details,
      title,
      field,
      location,
      salary,
      salary_currency,
      salary_period,
      ref,
      keywords,
      jd,
      apply_link,
      attachment_links,
    } = req.body;

    const existing = await Vacancy.findOne({ ref });

    if (existing) {
      return res.status(401).json({
        errors: [{ msg: "A vacancy already exists with this reference" }],
      });
    }

    const vacancy = new Vacancy({
      user,
      organisation,
      contact_name,
      contact_details,
      title,
      field,
      location,
      salary,
      salary_currency,
      salary_period,
      ref,
      keywords,
      jd,
      apply_link,
      attachment_links,
    });

    await vacancy.save();

    return res.json(vacancy);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/jobs/vacancies/:id
// @desc    Edit existing job vacancy
// @access  Private
router.put("/vacancies/:id", auth, async (req, res) => {
  try {
    const user = getAuthUserId(req);
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }

    if (user !== vacancy.user.toString()) {
      return res.status(401).json({
        errors: [{ msg: "You are not authorised to edit this vacancy" }],
      });
    }

    if (!vacancy) {
      return res.status(401).json({
        errors: [{ msg: "A vacancy already exists with this reference" }],
      });
    }

    const {
      organisation,
      contact_name,
      contact_details,
      title,
      field,
      location,
      salary,
      salary_currency,
      salary_period,
      ref,
      keywords,
      jd,
      apply_link,
      attachment_links,
    } = req.body;

    if (organisation && organisation !== vacancy.organisation) {
      vacancy.organisation = organisation;
    }

    if (contact_name && contact_name !== vacancy.contact_name) {
      vacancy.contact_name = contact_name;
    }

    if (
      contact_details &&
      contact_details.toString() !== vacancy.contact_details.toString()
    ) {
      vacancy.contact_details = contact_details;
    }

    if (title && title !== vacancy.title) {
      vacancy.title = title;
    }

    if (field && field !== vacancy.field) {
      vacancy.field = field;
    }

    if (location && location !== vacancy.location) {
      vacancy.location = location;
    }

    if (salary && salary !== vacancy.salary) {
      vacancy.salary = salary;
    }

    if (salary_currency && salary_currency !== vacancy.salary_currency) {
      vacancy.salary_currency = salary_currency;
    }

    if (salary_period && salary_period !== vacancy.salary_period) {
      vacancy.salary_period = salary_period;
    }

    if (ref && ref !== vacancy.ref) {
      vacancy.ref = ref;
    }

    if (keywords && keywords.toString() !== vacancy.keywords.toString()) {
      vacancy.keywords = keywords;
    }

    if (jd && jd !== vacancy.jd) {
      vacancy.jd = jd;
    }

    if (apply_link && apply_link !== vacancy.apply_link) {
      vacancy.apply_link = apply_link;
    }

    if (
      attachment_links &&
      attachment_links.toString() !== vacancy.attachment_links.toString()
    ) {
      vacancy.attachment_links = attachment_links;
    }

    await vacancy.save();

    return res.json(vacancy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   PUT api/jobs/vacancies/shortlist/:vacancyId
// @desc    Toggle vacancy in shortlist
// @access  Private
router.put("/vacancies/shortlist/:vacancyId", auth, async (req, res) => {
  try {
    const vacancyId = req.params.vacancyId;
    const userId = getAuthUserId(req);
    const user = await User.findById(userId);

    const shortlistIndex = user.shortlist.vacancies
      .map((id) => id.toString())
      .indexOf(vacancyId);

    if (shortlistIndex === -1) {
      user.shortlist.vacancies.unshift(vacancyId);
      await user.save();
      return res.json({ msg: "Added vacancy to shortlist" });
    } else {
      user.shortlist.vacancies.splice(shortlistIndex, 1);
      await user.save();
      return res.json({ msg: "Removed vacancy from shortlist" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

// @route   DELETE api/jobs/vacancies/:id
// @desc    Delete existing job vacancy
// @access  Private
router.delete("/vacancies/:id", auth, async (req, res) => {
  try {
    const userId = getAuthUserId(req);
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(400).json({ errors: [{ msg: "Vacancy not found" }] });
    }

    if (userId !== vacancy.user.toString()) {
      return res.status(401).json({
        errors: [{ msg: "You are not authorised to make this change" }],
      });
    }

    await Vacancy.findByIdAndDelete(req.params.id);

    return res.json({ msg: "Vacancy listing deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Vacancy not found" }] });
    }
    return res.status(500).send("Server error");
  }
});

module.exports = router;
