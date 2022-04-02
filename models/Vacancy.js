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
    type: [
      {
        form: String,
        detail: String,
      },
    ],
  },
  title: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  salary_currency: {
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
    type: [
      {
        form: String,
        link: String,
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vacancy = mongoose.model("vacancy", VacancySchema);
