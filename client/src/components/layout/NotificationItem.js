import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { toggleNotificationReadStatus } from "../../actions/items";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({
  reference,
  unread,
  notificationId,
  avatar,
  type,
  userDetails,
  date,
  toggleNotificationReadStatus,
}) => {
  const allUsers = Array.from(new Set(userDetails.map((obj) => obj.name)));

  const navigate = useNavigate();

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
    <div className={`notif-item-wrapper ${unread && "unread"}`}>
      <div className="notif-avatar-section">
        <div className="notif-avatar-wrapper">
          <img src={avatar} className="notif-avatar" />
        </div>
      </div>
      <div
        className="notif-info-section"
        onClick={() => {
          toggleNotificationReadStatus(notificationId, false);
          navigate(url, { replace: false });
        }}
      >
        <div className="notif-info-msg">
          {<strong>{name}</strong>}
          {` ${action}`}
        </div>
        <div className="notif-info-date">{moment(date).fromNow()}</div>
      </div>
      <p
        className="mark-as-read-btn noselect"
        onClick={() => toggleNotificationReadStatus(notificationId)}
      >
        {unread ? "Mark as read" : "Mark as unread"}
      </p>
    </div>
  );
};

NotificationItem.propTypes = {
  toggleNotificationReadStatus: PropTypes.func.isRequired,
};

export default connect(null, { toggleNotificationReadStatus })(
  NotificationItem
);
