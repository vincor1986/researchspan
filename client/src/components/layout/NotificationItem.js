import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NotificationItem = ({
  reference,
  unread,
  notificationId,
  avatar,
  type,
  userDetails,
  date,
}) => {
  const allUsers = Array.from(new Set(userDetails.map((obj) => obj.name)));

  const name =
    allUsers.length === 1
      ? allUsers[0]
      : allUsers.length === 2
      ? `${allUsers[0]} and ${allUsers[1]}`
      : allUsers.length === 3
      ? `${allUsers[0]}, ${allUsers[1]} and ${allUsers[2]}`
      : allUsers.length > 3
      ? `${allUsers[0]}, ${allUsers[1]}, ${allUsers[2]} and ${
          allUsers.length - 3
        } others`
      : "";

  const action =
    type === "answer"
      ? "answered your question"
      : type === "comment"
      ? "commented on your discussion post"
      : type === "coauthor_confirmed"
      ? "confirmed themselves as a co-author on your publication"
      : type === "confirm_coauthor"
      ? "has asked you to confirm that you are a co-author on their publication"
      : "";

  const url =
    type === "answer" || type === "comment"
      ? `/discuss/post/${reference}`
      : `/publications/${reference}`;

  return (
    <Link to={url} className={`notif-item-wrapper ${unread && "unread"}`}>
      <div className="notif-avatar-section">
        <div className="notif-avatar-wrapper">
          <img src={avatar} className="notif-avatar" />
        </div>
      </div>
      <div className="notif-info-section">
        <div className="notif-info-msg">
          {<strong>{name}</strong>}
          {` ${action}`}
        </div>
        <div className="notif-info-date">{date}</div>
      </div>
    </Link>
  );
};

NotificationItem.propTypes = {};

export default NotificationItem;
