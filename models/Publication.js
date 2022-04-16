const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  field: {
    type: String,
    required: true,
  },
  subcategories: {
    type: [String],
  },
  keywords: {
    type: [String],
  },
  coauthors: {
    type: [String],
  },
  date_published: {
    type: Date,
    required: true,
  },
  abstract: {
    type: String,
  },
  connectedUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  pendingUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  journal: {
    type: String,
  },
  issue: {
    type: String,
  },
  DOI: {
    type: String,
  },
  PMID: {
    type: String,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);
