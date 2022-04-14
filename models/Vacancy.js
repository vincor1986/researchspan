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
  contact_phone: {
    type: String,
  },
  contact_email: {
    type: String,
  },
  logo: {
    type: Buffer,
  },
  title: {
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
  fixed_term_length: {
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
    unique: true,
  },
  attachment_links: {
    type: [
      {
        form: String,
        link: String,
      },
    ],
  },
  closing_date: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vacancy = mongoose.model("vacancy", VacancySchema);
