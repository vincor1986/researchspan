import React from "react";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import { Link } from "react-router-dom";

const NotifcationsBox = ({ notifications }) => {
  return (
    <div className="notifications-container">
      <div className="notifications-wrapper">
        {[...notifications].reverse().map((notif) => (
          <NotificationItem
            key={notif.notificationId}
            reference={notif.reference}
            unread={notif.unread}
            notificationId={notif.notificationId}
            avatar={notif.avatar}
            type={notif.type}
            userDetails={notif.userArray}
            date={notif.date}
          />
        ))}
      </div>
      <Link to="/notifications" class="go-to-notif-btn">
        <p class="go-to-notif-btn">See all notifications</p>
      </Link>
    </div>
  );
};

NotifcationsBox.propTypes = {};

export default NotifcationsBox;
