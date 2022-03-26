const { numberParser } = require("config/parser");
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  org: {
    type: String,
  },
  department: {
    type: String,
  },
  degree: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  specialisms: {
    type: [String],
  },
  publications: [
    {
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
      link: {
        type: String,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  social: {
    linkedin: {
      type: String,
    },
    researchgate: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
