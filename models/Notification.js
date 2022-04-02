const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  notificationId: {
    type: String,
  },
  type: {
    type: String,
    required: true,
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
    required: true,
  },
  reply_reference: {
    type: String,
  },
  publication_title: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = Notification = mongoose.model(
  "notification",
  NotificationSchema
);
