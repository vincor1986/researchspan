import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { deleteItem } from "../../actions/items";
import defaultAvatar from "../../img/default-avatar.png";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/users";
import spinnerIcon from "../../img/icons/spinnerIcon.gif";

const Publication = ({
  pub: {
    _id,
    user,
    title,
    link,
    coauthors,
    connectedUsers,
    date_published,
    type,
    field,
    journal,
    issue,
    DOI,
    PMID,
    URL,
    authors,
    abstract,
    source,
  },
  items: { loading, lastActionSuccess },
  users: { loading: usersLoading, userArray },
  auth,
  deleteItem,
  getUsers,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sentDeleteReq, setSentDeleteReq] = useState(false);
  const [usersReady, setUsersReady] = useState(false);

  const navigate = useNavigate();

  const onDelete = () => {
    deleteItem(_id, "publication");
    setSentDeleteReq(true);
  };

  const isInArray = (id, arr) => arr.map((obj) => obj._id).includes(id);

  useEffect(() => {
    if (!usersReady) {
      getUsers(connectedUsers);
    }
  }, []);

  useEffect(() => {
    if (
      !usersLoading &&
      connectedUsers.length > 0 &&
      connectedUsers.every((userId) => isInArray(userId, userArray))
    ) {
      setUsersReady(true);
    }
  }, [connectedUsers, usersLoading, getUsers, userArray]);

  useEffect(() => {
    if (sentDeleteReq && !loading && lastActionSuccess) {
      navigate("/publications/mypublications");
    }
  }, [sentDeleteReq, loading, lastActionSuccess]);

  const authUserPost = auth.user._id === user.toString();

  return (
    <div class="main-body-container">
      {authUserPost && (
        <div class="user-controls-wrapper">
          <button class="create-new-btn" id="create-new-btn">
            New
          </button>
          <button
            class="edit-btn discuss-edit-btn"
            onClick={() =>
              navigate(`/discuss/post/${_id}/edit`, { replace: true })
            }
          >
            Edit
          </button>
          <button
            class="delete-btn discuss-delete-btn"
            onClick={() => setShowConfirmDelete(true)}
          >
            Delete
          </button>
        </div>
      )}
      {showConfirmDelete && (
        <div className="confirm-delete-wrapper">
          <h3 className="confirm-delete-msg">Confirm delete</h3>
          <div className="confirm-delete-btns-wrapper">
            <button
              class="edit-btn discuss-edit-btn"
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancel
            </button>
            <button class="delete-btn discuss-delete-btn" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
      <div class="main-content">
        <div class="job-title-wrapper">
          <h3 class="title">{title}</h3>
        </div>
        <div class="location-wrapper">
          <h3 class="location">{moment(date_published).format("MMMM YYYY")}</h3>
        </div>
        <div class="result-publication-details">
          {type && <div class="tag">{type}</div>}
          {authors &&
            authors.map((author, i) => {
              return (
                <div class="result-author-wrapper" key={i}>
                  <div class="result-author-avatar-wrapper">
                    <img class="result-author-avatar" src={defaultAvatar} />
                  </div>
                  <p class="result-author">
                    {author.given
                      ? `${author.given} ${author.family}`
                      : author[0]}
                  </p>
                </div>
              );
            })}
          {connectedUsers &&
            connectedUsers.map((author, i) =>
              usersLoading || !usersReady ? (
                <img src={spinnerIcon} alt="spinner" className="tiny-spinner" />
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
        <div class="job-detail-container">
          <div class="vacancy-details-summary-container">
            {field && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Field:</p>
                <p class="detail-summary">{field}</p>
              </div>
            )}
            {journal && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Journal:</p>
                <p class="detail-summary">{journal}</p>
              </div>
            )}
            {issue && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Issue:</p>
                <p class="detail-summary">{issue}</p>
              </div>
            )}
            {DOI && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">DOI:</p>
                <p class="detail-summary">{DOI}</p>
              </div>
            )}
            {PMID && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">PMID:</p>
                <p class="detail-summary">{PMID}</p>
              </div>
            )}
            {source && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Source:</p>
                <p class="detail-summary">{source}</p>
              </div>
            )}
            <div class="detail-summary-wrapper">
              <p class="detail-summary-label">Date published:</p>
              <p class="detail-summary">
                {moment(date_published).format("Do MMMM YYYY")}
              </p>
            </div>
          </div>
          <div class="job-desc-container">
            <div class="comments-title-wrapper">
              <p class="comments-title">Abstract</p>
            </div>
            <div class="full-content-wrapper">
              {abstract &&
                abstract.split("\n").map((content) => {
                  return (
                    <Fragment>
                      <p class="text-content">{content}</p>
                      <br />
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>
        <Link to={link ? link : URL} class="apply-btn vacancy-apply">
          <p class="btn-text">Access in full</p>
          <img class="btn-icon" src="./img/icons/new-window.png" />
        </Link>
      </div>
    </div>
  );
};

Publication.propTypes = {
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, {
  deleteItem,
  getUsers,
})(Publication);
