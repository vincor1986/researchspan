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
