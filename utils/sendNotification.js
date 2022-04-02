const User = require("../models/User");
const Publication = require("../models/Publication");
const Post = require("../models/Post");
const getPostUser = require("./getPostUser");

const sendNotification = async (params) => {
  const { type, sendingUserId, referenceId, postId, recipientUserId, head } =
    params;
  const { avatar, first_name, last_name } = await User.findById(sendingUserId);

  // types

  try {
    switch (type) {
      case "answer": {
        const { user } = await Post.findById(referenceId);
        const recipient = await User.findById(user.toString());
        const existingNotificationIndex = recipient.notifications
          .map((obj) => obj.reference)
          .indexOf(referenceId);

        if (existingNotificationIndex === -1) {
          const newNotification = new Notification({
            type,
            avatar,
            userArray: [
              { id: sendingUserId, name: `${first_name} ${last_name}` },
            ],
            notificationIndex: recipient.notifications.length,
            reference: referenceId,
          });
          recipient.notifications.unshift(newNotification);
        } else {
          recipient.notifications[existingNotificationIndex] = {
            ...recipient.notifications[existingNotificationIndex],
            date: Date.now(),
            avatar,
            userArray: [
              ...recipient.notifications[existingNotificationIndex].userArray,
              { id: sendingUserId, name: `${first_name} ${last_name}` },
            ],
            unread: true,
          };
          const removed = recipient.notifications.splice(
            existingNotificationIndex,
            1
          );
          recipient.notifications.unshift(removed[0]);
        }
        recipient.markModified("notifications");
        await recipient.save();
        break;
      }
      case "reply": {
        const user = getPostUser(head, postId);
        const recipient = await User.findById(user);
        const existingNotificationIndex = recipient.notifications
          .map((obj) => obj.reply_reference)
          .indexOf(postId);

        if (existingNotificationIndex === -1) {
          const newNotification = new Notification({
            type,
            avatar,
            userArray: [
              { id: sendingUserId, name: `${first_name} ${last_name}` },
            ],
            notificationIndex: recipient.notifications.length,
            reference: referenceId,
            reply_reference: postId,
          });
          recipient.notifications.unshift(newNotification);
        } else {
          recipient.notifications[existingNotificationIndex] = {
            ...recipient.notifications[existingNotificationIndex],
            date: Date.now(),
            avatar,
            userArray: [
              ...recipient.notifications[existingNotificationIndex].userArray,
              { id: sendingUserId, name: `${first_name} ${last_name}` },
            ],
            unread: true,
          };
          const removed = recipient.notifications.splice(
            existingNotificationIndex,
            1
          );
          recipient.notifications.unshift(removed[0]);
        }
        recipient.markModified("notifications");
        await recipient.save();
        break;
      }
      case "confirm_coauthor": {
        const recipient = await User.findById(recipientUserId);
        const { title } = await Publication.findById(referenceId);

        const newNotification = new Notification({
          type,
          avatar,
          userArray: [
            { id: sendingUserId, name: `${first_name} ${last_name}` },
          ],
          notificationIndex: recipient.notifications.length,
          reference: referenceId,
          publication_title: title,
        });
        recipient.notifications.unshift(newNotification);

        recipient.markModified("notifications");
        await recipient.save();
        break;
      }
    }
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

module.exports = sendNotification;
