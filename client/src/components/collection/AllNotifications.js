import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultsLoading from "../layout/ResultsLoading";
import { getCollection } from "../../actions/collection";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { toggleNotificationReadStatus } from "../../actions/items";
import NotificationItem from "../layout/NotificationItem";

const AllNotifications = ({ user: { notifications }, authLoading }) => {
  const showResults = (
    <div class="main-body-container" style={{ marginLeft: "0rem" }}>
      <div class="main-title-wrapper">
        <h3 class="main-title">Notifications</h3>
      </div>
      <h4 class="main-title-subheading">
        Displaying all notifications from history. View content or toggle the
        read status here.
      </h4>
      <div
        class="main-content-container discuss-main-content"
        id="publication-main-content"
        style={{ padding: "5rem 15rem" }}
      >
        <div class="main-content-results-label">
          <h4 class="subheading results-msg">Notifications</h4>
          <p class="results-stat">{`${
            notifications &&
            commaSeperateNumber(
              notifications.filter((obj) => obj.unread).length
            )
          } unread`}</p>
        </div>
        <div class="results-section">
          {notifications && notifications.length === 0 && (
            <h4 className="no-results-msg">
              {"You currently have no notifications"}
            </h4>
          )}
          {notifications &&
            notifications.length > 0 &&
            notifications.reverse().map((result, index) => {
              return (
                <div
                  className="collection-item-wrapper"
                  style={{ padding: "0rem 15rem" }}
                >
                  <NotificationItem
                    reference={result.reference}
                    unread={result.unread}
                    notificationId={result.notificationId}
                    avatar={result.avatar}
                    type={result.type}
                    userDetails={result.userArray}
                    date={result.date}
                  />
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  return authLoading || !notifications ? <ResultsLoading /> : showResults;
};

AllNotifications.propTypes = {
  collection: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  user: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getCollection })(AllNotifications);
