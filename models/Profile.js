const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  organisation: {
    type: String,
  },
  department: {
    type: String,
  },
  position: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  interests: {
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
