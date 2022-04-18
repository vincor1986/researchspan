const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
  },
  position: {
    type: String,
  },
  location: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
  },
  main: {
    type: String,
    required: true,
  },
  context: {
    type: String,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  last_edited: {
    type: Date,
  },
  replyData: [mongoose.Mixed],
  date: {
    type: Date,
    default: Date.now,
  },
  consensus_agree: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  consensus_disagree: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  recommended: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  responses: {
    type: [
      {
        type: mongoose.Mixed,
      },
    ],
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
