import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../img/default-avatar.png";
import newWindowIcon from "../../img/icons/new-window.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/users";
import spinnerIcon from "../../img/icons/spinnerIcon.gif";

const RsPubResult = ({
  title,
  date_published,
  authors,
  abstract,
  type,
  link,
  PMID,
  field,
  subcategories,
  coauthors,
  connectedUsers,
  DOI,
  keywords,
  getUsers,
  users: { loading, userArray },
}) => {
  const [usersReady, setUsersReady] = useState(connectedUsers.length === 0);

  const isInArray = (id, arr) => arr.map((obj) => obj._id).includes(id);

  useEffect(() => {
    if (!usersReady) {
      getUsers(connectedUsers);
    }
  }, []);

  useEffect(() => {
    if (
      !loading &&
      connectedUsers.length > 0 &&
      connectedUsers.every((userId) => isInArray(userId, userArray))
    ) {
      setUsersReady(true);
    }
  }, [connectedUsers, loading, getUsers, userArray]);

  return (
    <div class="result">
      <div class="result-publication-content-section">
        <h4 class="result-publication-title">{title}</h4>
        <div class="result-publication-details">
          <div class="result-publication-detail-wrapper">
            <div class="result-publication-date">
              {date_published
                ? Date(date_published)
                    .split(" ")
                    .slice(1, 4)
                    .splice(1, 1)
                    .join(" ")
                : ""}
            </div>
            {type ? <div class="tag">{type}</div> : ""}
          </div>
          <div class="result-all-authors-wrapper">
            {connectedUsers &&
              connectedUsers.map((author, i) =>
                loading || !usersReady ? (
                  <img
                    src={spinnerIcon}
                    alt="spinner"
                    className="tiny-spinner"
                  />
                ) : (
                  <div class="result-author-wrapper" key={i}>
                    <div class="result-author-avatar-wrapper">
                      <img
                        class="result-author-avatar"
                        src={
                          userArray.find((obj) => obj._id.toString() === author)
                            .avatar
                        }
                        alt="avatar"
                      />
                    </div>
                    <p class="result-author">
                      {`${
                        userArray.find((obj) => obj._id.toString() === author)
                          .first_name
                      } ${
                        userArray.find((obj) => obj._id.toString() === author)
                          .last_name
                      }`}
                    </p>
                  </div>
                )
              )}
            {coauthors &&
              coauthors.map((author, i) => {
                return (
                  <div class="result-author-wrapper" key={i}>
                    <div class="result-author-avatar-wrapper">
                      <img
                        class="result-author-avatar"
                        src={defaultAvatar}
                        alt="avatar"
                      />
                    </div>
                    <p class="result-author">{author}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div class="result-content-context-section">
          {abstract && (
            <p class="result-content-context abstract-text">
              <strong id="abstract-title">Abstract:</strong> <br />
              {abstract}
            </p>
          )}
        </div>
        <div
          class="result-job-apply-section"
          id="publications-apply-controls-wrapper"
        >
          {/* <button class="more-info-btn apply-btn">More info</button> */}
          <a
            href={link}
            target="_blank"
            rel="external noopener noreferrer"
            referrerPolicy="no-referrer"
            class="apply-link-btn apply-btn link-btn"
          >
            <p class="btn-text">More info</p>
            <img class="btn-icon" src={newWindowIcon} alt="new-window-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

RsPubResult.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(RsPubResult);
