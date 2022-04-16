import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, findUserBySearch } from "../../actions/users";
import defaultAvatar from "../../img/default-avatar.png";
import spinnerIcon from "../../img/icons/spinnerIcon.gif";
import { useNavigate } from "react-router-dom";

const EditPublication = ({
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
    abstract,
  },
  users: { loading, userArray, userSearch },
  getUsers,
  findUserBySearch,
}) => {
  const [formData, setFormData] = useState({
    title,
    link,
    coauthors,
    connectedUsers,
    date_published,
    type,
    field,
    abstract,
    journal,
    issue,
    DOI,
    PMID,
  });

  const [usersReady, setUsersReady] = useState(false);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [currentUserSearch, setCurrentUserSearch] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const navigate = useNavigate();

  const removeExistingConnectedUser = (index) => {
    setFormData((prev) => {
      const connected = prev.connectedUsers;
      connected.splice(index, 1);
      return { ...prev, connectedUsers: connected };
    });
  };
  const removeExistingUser = (index) => {
    setFormData((prev) => {
      const connected = prev.coauthors;
      connected.splice(index, 1);
      return { ...prev, coauthors: connected };
    });
  };

  const addConnectedUser = (index) => {
    setFormData((prev) => {
      const connected = prev.connectedUsers;
      connected.push(userSearch[index]);
      return { ...prev, connectedUsers: connected };
    });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };

  const existingUsers = [
    ...formData.connectedUsers.map((author, i) =>
      loading || !usersReady ? (
        <img src={spinnerIcon} alt="spinner" className="tiny-spinner" />
      ) : (
        <div class="result-author-wrapper" key={i}>
          <div class="result-author-avatar-wrapper">
            <img
              class="result-author-avatar"
              src={
                allUserData.find((obj) => obj._id.toString() === author).avatar
              }
              alt="avatar"
            />
          </div>
          <p class="result-author">
            {`${
              allUserData.find((obj) => obj._id.toString() === author)
                .first_name
            } ${
              allUserData.find((obj) => obj._id.toString() === author).last_name
            }`}
          </p>
          <p
            style={{ marginLeft: "1rem", fontWeight: "bold" }}
            onClick={() => removeExistingConnectedUser(i)}
          >
            X
          </p>
        </div>
      )
    ),
    formData.coauthors.map((name, i) => (
      <div class="result-author-wrapper" key={i}>
        <div class="result-author-avatar-wrapper">
          <img class="result-author-avatar" src={defaultAvatar} alt="avatar" />
        </div>
        <p class="result-author">
          {name
            .split(" ")
            .map((el) =>
              el
                .split("")
                .map((char, index) =>
                  index !== 0 ? char : char.toUpperCase().join("")
                )
                .trim()
            )
            .join(" ")}
        </p>
        <p
          style={{ marginLeft: "1rem", fontWeight: "bold" }}
          onClick={() => removeExistingUser(i)}
        >
          X
        </p>
      </div>
    )),
  ];

  const isInArray = (id, arr) => arr.map((obj) => obj._id).includes(id);

  useEffect(() => {
    if (!usersReady) {
      getUsers(connectedUsers);
    }
  }, []);

  useEffect(() => {
    if (
      !loading &&
      !usersReady &&
      connectedUsers.length > 0 &&
      connectedUsers.every((userId) => isInArray(userId, userArray))
    ) {
      setUsersReady(true);
      setAllUserData([...userArray]);
    }
  }, [connectedUsers, loading, getUsers, userArray]);

  useEffect(() => {
    if (searchingUsers && !loading) {
      setSearchingUsers(false);
    }
  }, [searchingUsers]);

  useEffect(() => {
    setAllUserData([...allUserData, ...userSearch]);
  }, [userSearch]);

  const findUserByName = () => {
    findUserBySearch(currentUserSearch);
    setSearchingUsers(true);
  };

  return (
    <div class="main-body-container">
      <div class="user-controls-wrapper">
        <button
          class="delete-btn discuss-delete-btn"
          onClick={() => setShowConfirmDelete(true)}
        >
          Delete
        </button>
      </div>
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
        <form class="edit-discussion-form">
          <div class="job-title-wrapper">
            <p class="detail-summary-label">Title:</p>
            <textarea
              class="title edit edit-main"
              name="title"
              value={formData.title}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div class="result-publication-details">
            <br />
            <p class="detail-summary-label">Date published:</p>
            <input
              type="date"
              class="location edit job-detail-edit"
              name="date_published"
              onChange={(e) => onChange(e)}
              value={formData.date_published}
            ></input>
            <br />
            <p class="detail-summary-label">Type of publication:</p>
            <input
              type="text"
              class="edit job-detail-edit"
              name="type"
              onChange={(e) => onChange(e)}
              value={formData.type}
            ></input>
            <br />
            <p class="detail-summary-label">Co-authors:</p>
            {/* <input
              type="text"
              class="edit job-detail-edit"
              value={currentUserSearch}
              onChange={(e) => setCurrentUserSearch(e.target.value)}
            >
              {existingUsers}
            </input> */}
            <div class="current-user-search-results">
              {userSearch.map((obj, i) => {
                return (
                  <div className="user-match">
                    <div
                      class="result-author-wrapper"
                      key={i}
                      onClick={() => addConnectedUser}
                    >
                      <div class="result-author-avatar-wrapper">
                        <img
                          class="result-author-avatar"
                          src={obj.avatar}
                          alt="avatar"
                        />
                      </div>
                      <p class="result-author">
                        {`${obj.first_name} ${obj.last_name}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div class="job-detail-container">
            <div class="vacancy-details-summary-container">
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Field:</p>
                <input
                  name="field"
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="detail-summary"
                >
                  {field}
                </input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Journal:</p>
                <input
                  type="text"
                  value={formData.journal}
                  name="journal"
                  onChange={(e) => onChange(e)}
                  class="detail-summary"
                >
                  {journal}
                </input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Issue:</p>
                <input
                  type="text"
                  name="issue"
                  value={formData.issue}
                  onChange={(e) => onChange(e)}
                  class="detail-summary"
                >
                  {issue}
                </input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">DOI:</p>
                <input
                  type="text"
                  name="DOI"
                  value={formData.DOI}
                  onChange={(e) => onChange(e)}
                  class="detail-summary"
                >
                  {DOI}
                </input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">PMID:</p>
                <input
                  type="text"
                  name="PMID"
                  value={formData.PMID}
                  onChange={(e) => onChange(e)}
                  class="detail-summary"
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Source:</p>
                <input
                  type="text"
                  class="detail-summary"
                  value={formData.source}
                  onChange={(e) => onChange(e)}
                  name="source"
                ></input>
              </div>
            </div>
            <div class="job-desc-container">
              <div class="comments-title-wrapper">
                <p class="comments-title">Abstract</p>
              </div>
              <div class="full-content-wrapper">
                <textarea
                  class="context edit-context"
                  value={formData.abstract}
                  name="abstract"
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
          </div>
          <div class="post-actions-section">
            <button class="save-changes-btn" onClick={(e) => onSubmit(e)}>
              Save changes
            </button>
            <button
              class="save-changes-btn cancel-btn"
              onClick={() =>
                navigate(`/publications/${_id}`, { replace: false })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditPublication.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  findUserBySearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers, findUserBySearch })(
  EditPublication
);
