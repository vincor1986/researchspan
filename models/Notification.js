const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  userArray: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],
  unread: {
    type: Boolean,
    default: true,
  },
  reference: {
    type: String,
  },
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
