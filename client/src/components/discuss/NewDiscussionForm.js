import React from "react";
import PropTypes from "prop-types";

const NewDiscussionForm = ({ toggle }) => {
  return (
    <form class="create-new-form">
      <div class="create-new-container">
        <div class="new-title-wrapper">
          <label class="create-new-label" for="new-type">
            Type:
          </label>
          <select class="new-type">
            <option class="new-type-option" value="discussion">
              Discussion
            </option>
            <option class="new-type-option" value="question">
              Question
            </option>
          </select>
          <label class="create-new-label" for="new-title">
            Title:
          </label>
          <textarea
            name="new-title"
            class="edit new-title"
            maxlength="250"
          ></textarea>
          <label class="create-new-label" for="new-context">
            Context:
          </label>
          <textarea
            name="new-context"
            class="edit new-context"
            maxlength="750"
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
            />
          </div>
          <div class="create-new-controls">
            <button class="cancel-btn" onClick={toggle}>
              Cancel
            </button>
            <button type="submit" class="create-new-btn">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

NewDiscussionForm.propTypes = {};

export default NewDiscussionForm;
