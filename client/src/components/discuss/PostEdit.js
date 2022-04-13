import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editDiscussion } from "../../actions/discussion";

const PostEdit = ({
  post: {
    _id,
    user,
    first_name,
    last_name,
    title,
    avatar,
    format,
    keywords,
    main,
    context,
    edited,
    responses,
    head,
    consensus_agree,
    consensus_disagree,
    recommended,
    date,
    last_edited,
    organisation,
  },
  items: { loading, lastActionSuccess },
  editDiscussion,
}) => {
  const [formData, setFormData] = useState({
    keywords: keywords.join(", "),
    format,
    main,
    context,
  });

  const [sentData, setSentData] = useState(false);

  const { postId } = useParams();

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    sentData && setSentData(false);
  };

  const setFormat = (value) => {
    setFormData({ ...formData, format: value });
    sentData && setSentData(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSentData(true);
    editDiscussion(formData, _id);
  };

  useEffect(() => {
    if (sentData && !loading && lastActionSuccess) {
      navigate(`/discuss/post/${_id}`, { replace: false });
    }
  }, [loading]);

  return (
    <div class="main-body-container">
      <div class="user-detail-section">
        <div class="user-detail-wrapper">
          <div class="user-avatar-section">
            <div class="user-avatar-wrapper">
              <img src="./img/default-avatar.png" alt="avatar" class="avatar" />
            </div>
          </div>
          <div class="user-info-section">
            <h2 class="user-info-name">
              Vincent Coraldean
              <a href="#" class="user-view-profile-link">
                view profile
              </a>
            </h2>
            <p class="user-organisation">Lead Developer at Research Span</p>
          </div>
        </div>
        <div class="user-controls-wrapper">
          <button class="delete-btn discuss-delete-btn">Delete post</button>
        </div>
      </div>
      <div class="main-content">
        <form class="edit-discussion-form">
          <div class="date-posted-msg">
            <p class="date-posted-label">Posted on:</p>
            <p class="date-posted">Wednesday 6th April 2022 at 12:12pm GMT</p>
            <p class="edited tag">Edited</p>
          </div>
          <label class="create-new-label" for="new-type">
            Type:
          </label>
          <select class="new-type">
            <option
              class="new-type-option"
              value="discussion"
              selected={formData.format === "discussion"}
              onChange={() => setFormat("discussion")}
            >
              Discussion
            </option>
            <option
              class="new-type-option"
              value="question"
              selected={formData.format === "question"}
              onChange={() => setFormat("question")}
            >
              Question
            </option>
          </select>
          <div class="keywords-editor-wrapper">
            <h4 class="keywords-label">
              Keywords <span class="keywords-note">comma-seperated</span>
            </h4>
            <textarea
              class="edit-keywords"
              name="keywords"
              value={formData.keywords}
              maxlength={120}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div class="main-msg-container">
            <textarea
              class="main-msg edit-main"
              value={formData.main}
              name="main"
              maxlength={250}
              onChange={(e) => onChange(e)}
            ></textarea>
            <p class="chars-remaining">{`${
              250 - formData.main.length
            } characters remaining`}</p>
          </div>

          <div class="context-msg-wrapper">
            <p class="context-label">Context:</p>
            <textarea
              class="context edit-context"
              value={formData.context}
              name="context"
              maxlength={1500}
              onChange={(e) => onChange(e)}
            ></textarea>
            <p class="chars-remaining">{`${
              1500 - formData.context.length
            } characters remaining`}</p>
          </div>
          <div class="post-actions-section">
            <button class="save-changes-btn" onClick={(e) => onSubmit(e)}>
              Save changes
            </button>
            <button
              class="save-changes-btn cancel-btn"
              onClick={() =>
                navigate(`/discuss/post/${_id}`, { replace: false })
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

PostEdit.propTypes = {
  editDiscussion: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { editDiscussion })(PostEdit);
