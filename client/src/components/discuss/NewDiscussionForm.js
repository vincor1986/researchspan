import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/discussion";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";

const NewDiscussionForm = ({
  toggle,
  items: { loading, lastActionSuccess, discussion },
  createPost,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    format: "discussion",
    main: "",
    context: "",
    keywords: "",
  });
  const [sentData, setSentData] = useState(false);

  const navigate = useNavigate();

  const { format, main, context, keywords } = formData;

  const required = ["main"];

  const checkInput = () => {
    return required.filter((el) => formData[`${el}`] === "");
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const missing = checkInput();
    if (missing.length > 0) {
      console.log(missing);
      missing.forEach((input) =>
        setAlert(`Title is a required field`, "warning")
      );
      return;
    }
    e.preventDefault();
    createPost(formData);
    setSentData(true);
  };

  useEffect(() => {
    if (
      sentData &&
      !loading &&
      lastActionSuccess &&
      discussion &&
      discussion._id
    ) {
      navigate(`/discuss/post/${discussion._id}`);
    }
  }, [loading, lastActionSuccess, sentData, discussion._id]);

  return (
    <form class="create-new-form">
      <div class="create-new-container">
        <div class="new-title-wrapper">
          <label class="create-new-label" for="new-type">
            Type:
          </label>
          <select class="new-type" name="format" onChange={(e) => onChange(e)}>
            <option class="new-type-option" value="discussion">
              Discussion
            </option>
            <option class="new-type-option" value="question">
              Question
            </option>
          </select>
          <label class="create-new-label" for="new-title">
            Title: <span class="required-msg">*</span>
          </label>
          <textarea
            class="edit new-title"
            maxlength="250"
            name="main"
            value={main}
            onChange={(e) => onChange(e)}
            required={true}
          ></textarea>
          <label class="create-new-label" for="new-context">
            Context:
          </label>
          <textarea
            class="edit new-context"
            maxlength="750"
            name="context"
            value={context}
            onChange={(e) => onChange(e)}
          ></textarea>
          <br />
          <div class="keywords-editor-wrapper">
            <label class="create-new-label">
              Keywords:
              <span class="keywords-note">{"  "}comma-seperated</span>
            </label>
            <input
              class="edit edit-keywords"
              id="edit-keywords"
              maxlength="120"
              type="text"
              name="keywords"
              value={keywords}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="create-new-controls">
            <button
              class="cancel-btn"
              onClick={(e) => {
                e.preventDefault();
                return toggle
                  ? toggle()
                  : navigate("/discuss/", { replace: false });
              }}
              style={{ marginLeft: "2rem", height: "4rem" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="create-new-btn"
              style={{ marginLeft: "2rem", height: "4rem" }}
              onClick={(e) => onSubmit(e)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

NewDiscussionForm.propTypes = {
  items: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
});

export default connect(mapStateToProps, { createPost, setAlert })(
  NewDiscussionForm
);
