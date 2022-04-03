const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  pub_id_array: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
  orgnisation: {
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
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  notifications: [
    {
      type: mongoose.Mixed,
    },
  ],
  shortlist: {
    vacancies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vacancy",
      },
    ],
    publications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publication",
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
