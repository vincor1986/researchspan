import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { findUserBySearch } from "../../actions/users";
import defaultAvatar from "../../img/default-avatar.png";
import spinnerIcon from "../../img/icons/spinnerIcon.gif";
import { useNavigate } from "react-router-dom";
import { createPublication } from "../../actions/items";
import { setAlert } from "../../actions/alert";

const NewPublication = ({
  users: { loading, userSearch },
  items: { loading: itemLoading, lastActionSuccess, publication },
  auth: { user, loading: authLoading },
  findUserBySearch,
  createPublication,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    coauthors: [],
    connectedUsers: [],
    date_published: "",
    type: "",
    field: "",
    abstract: "",
    journal: "",
    issue: "",
    DOI: "",
    PMID: "",
  });

  const [searchingUsers, setSearchingUsers] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [currentUserSearch, setCurrentUserSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [sentPostReq, setSentPostReq] = useState(false);

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
      const connected = [...prev.connectedUsers, userSearch[index]._id];
      return { ...prev, connectedUsers: connected };
    });
  };

  const updateSearch = (e) => {
    const str = e.target.value;
    if (str[str.length - 1] === ",") {
      setCurrentUserSearch("");
      setFormData((prev) => {
        const brokenName = str.split(" ");
        const capitalised = brokenName.map((name) =>
          name
            .split("")
            .map((char, i) =>
              i === 0 ? char.toUpperCase() : char.toLowerCase()
            )
            .join("")
        );
        const trimmed = capitalised.map((el) => el.trim());
        const final = trimmed.join(" ").replace(",", "");
        let co_authors = [...prev.coauthors, final];
        return { ...prev, coauthors: co_authors };
      });
    } else {
      setCurrentUserSearch(str);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const required = ["title", "date_published", "field", "link"];

  const checkInput = () => {
    return required.filter((el) => formData[`${el}`] === "");
  };

  const onSubmit = (e) => {
    const missing = checkInput();
    if (missing.length > 0) {
      missing.forEach((el) => setAlert(`${el} is a required field`, "warning"));
      return;
    }
    e.preventDefault();
    createPublication(formData);
    setSentPostReq(true);
  };

  const isInArray = (id, arr) => arr.map((obj) => obj._id).includes(id);

  useEffect(() => {
    if (!authLoading && Object.keys(user).length > 0) {
      setAllUserData([user]);
      setFormData({ ...formData, connectedUsers: [user._id] });
    }
  }, [authLoading, user, setFormData]);

  useEffect(() => {
    if (searchingUsers && !loading) {
      setSearchingUsers(false);
    }
  }, [loading, searchingUsers]);

  useEffect(() => {
    setAllUserData([...allUserData, ...userSearch]);
  }, [userSearch, loading]);

  useEffect(() => {
    if (!loading && !searchingUsers && currentUserSearch !== lastSearch) {
      findUserBySearch(currentUserSearch);
      setLastSearch(currentUserSearch);
    }
  }, [loading, searchingUsers, currentUserSearch, lastSearch]);

  useEffect(() => {
    if (sentPostReq && !itemLoading && lastActionSuccess && publication._id) {
      navigate(`/publications/${publication._id}`, { replace: false });
    }
  }, [sentPostReq, itemLoading, lastActionSuccess, publication._id]);

  const existingUsers = [
    ...formData.connectedUsers.map((author, i) =>
      !isInArray(author, allUserData) ? (
        <img src={spinnerIcon} alt="spinner" className="tiny-spinner" />
      ) : (
        <div class="result-author-wrapper edit-pub-user" key={i}>
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
          {author !== user._id && (
            <p
              style={{
                fontSize: "1.5rem",
                color: "#258faa",
                marginLeft: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => removeExistingConnectedUser(i)}
            >
              X
            </p>
          )}
        </div>
      )
    ),
    formData.coauthors.map((name, i) => (
      <div class="result-author-wrapper  edit-pub-user" key={i}>
        <div class="result-author-avatar-wrapper">
          <img class="result-author-avatar" src={defaultAvatar} alt="avatar" />
        </div>
        <p class="result-author">{name}</p>
        <p
          style={{ marginLeft: "1rem", fontWeight: "bold" }}
          onClick={() => removeExistingUser(i)}
        >
          X
        </p>
      </div>
    )),
  ];

  return (
    <div class="main-body-container">
      <div class="main-content">
        <form class="edit-discussion-form" style={{ paddingTop: "8rem" }}>
          <div class="job-title-wrapper">
            <p class="detail-summary-label pub-label">
              Title: <span class="required-msg">*</span>
            </p>
            <textarea
              class="title edit edit-main"
              name="title"
              value={formData.title}
              onChange={(e) => onChange(e)}
              required={true}
            ></textarea>
          </div>
          <div class="result-publication-details">
            <div style={{ width: "60%" }}>
              <br />
              <p class="detail-summary-label pub-label">
                Date published: <span class="required-msg">*</span>
              </p>
              <input
                type="date"
                class="location edit job-detail-edit date-input"
                name="date_published"
                onChange={(e) => onChange(e)}
                value={formData.date_published.substring(0, 10)}
                required={true}
              ></input>
              <br />
              <p class="detail-summary-label pub-label">Type of publication:</p>
              <input
                type="text"
                class="edit job-detail-edit"
                name="type"
                onChange={(e) => onChange(e)}
                value={formData.type}
              ></input>
              <br />
              <p class="detail-summary-label pub-label">Author / Co-authors:</p>
              <div className="edit-pub-users">{existingUsers}</div>
              <input
                type="text"
                class="edit job-detail-edit"
                value={currentUserSearch}
                onChange={(e) => updateSearch(e)}
              ></input>
            </div>
            {currentUserSearch !== "" && (
              <div class="current-user-search-results">
                {userSearch &&
                  userSearch.map((obj, i) => {
                    if (!formData.connectedUsers.includes(obj._id))
                      return (
                        <div className="user-match">
                          <div
                            class="result-author-wrapper  edit-pub-user"
                            key={i}
                            onClick={() => addConnectedUser(i)}
                            style={{ cursor: "pointer" }}
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
            )}
          </div>
          <div class="job-detail-container">
            <div class="vacancy-details-summary-container">
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">
                  Field: <span class="required-msg">*</span>
                </p>
                <input
                  name="field"
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="edit job-detail-edit"
                  value={formData.field}
                  required={true}
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Journal:</p>
                <input
                  type="text"
                  value={formData.journal}
                  name="journal"
                  onChange={(e) => onChange(e)}
                  class="edit job-detail-edit"
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Issue:</p>
                <input
                  type="text"
                  name="issue"
                  value={formData.issue}
                  onChange={(e) => onChange(e)}
                  class="edit job-detail-edit"
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">DOI:</p>
                <input
                  type="text"
                  name="DOI"
                  value={formData.DOI}
                  onChange={(e) => onChange(e)}
                  class="edit job-detail-edit"
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">PMID:</p>
                <input
                  type="text"
                  name="PMID"
                  value={formData.PMID}
                  onChange={(e) => onChange(e)}
                  class="edit job-detail-edit"
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">
                  Link: <span class="required-msg">*</span>
                </p>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={(e) => onChange(e)}
                  class="edit job-detail-edit"
                  required={true}
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
                navigate(`/publications/mypublications`, { replace: false })
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

NewPublication.propTypes = {
  users: PropTypes.object.isRequired,
  findUserBySearch: PropTypes.func.isRequired,
  createPublication: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  findUserBySearch,
  createPublication,
  setAlert,
})(NewPublication);
