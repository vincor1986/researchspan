const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  organisation: {
    type: String,
    required: true,
  },
  contact_name: {
    type: String,
  },
  contact_details: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  salary_period: {
    type: String,
  },
  ref: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
  },
  jd: {
    type: String,
    required: true,
  },
  apply_link: {
    type: String,
    required: true,
  },
  attachment_links: {
    type: [String],
  },
});

module.exports = Vacancy = mongoose.model("vacancy", VacancySchema);
