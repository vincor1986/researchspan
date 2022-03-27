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
    required: true,
  },
  colleagues: {
    type: [String],
  },
  connectedUsers: {
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
    required: true,
  },
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);
