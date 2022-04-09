import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const DiscussionSearch = () => {
  return (
    <Fragment>
      {" "}
      <div class="search-panel discuss-search-panel">
        <div class="search-panel-title">
          <p>Configure your search</p>
        </div>
        <div class="search-panel-form-wrapper">
          <form class="search-panel-form">
            <h4 class="search-panel-subheading">Show</h4>
            <div class="search-panel-wrapper">
              <div class="search-panel-checkbox-item">
                <label
                  for="show-discussions-checkbox"
                  class="search-panel-label"
                >
                  Discussions
                </label>
                <input
                  type="checkbox"
                  class="checkbox"
                  name="show-discussions-checkbox"
                  checked="true"
                />
              </div>
              <div class="search-panel-checkbox-item">
                <label for="show-questions-checkbox" class="search-panel-label">
                  Questions
                </label>
                <input
                  type="checkbox"
                  class="checkbox"
                  name="show-questions-checkbox"
                  checked="true"
                />
              </div>
            </div>
            <h4 class="search-panel-subheading">Keywords</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-text-input" class="search-panel-label">
                Search
              </label>
              <input
                class="search-panel-text-input"
                name="search-panel-text-input"
                type="text"
                placeholder="field, subject or topic"
              />
            </div>
            <h4 class="search-panel-subheading">Categories</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-select-input" class="search-panel-label">
                Subject
              </label>
              <select
                class="search-panel-text-input"
                name="search-panel-select-input"
              >
                <option class="search-panel-select-option">Science</option>
                <option class="search-panel-select-option">Technology</option>
                <option class="search-panel-select-option">General</option>
                <option class="search-panel-select-option">Politics</option>
                <option class="search-panel-select-option">Sociology</option>
                <option class="search-panel-select-option">History</option>
                <option class="search-panel-select-option">
                  Business {"&"} Industry
                </option>
              </select>
              <label for="search-panel-select-input" class="search-panel-label">
                Field
              </label>
              <select
                class="search-panel-text-input"
                name="search-panel-select-input"
                disabled="true"
              ></select>
            </div>
            <button type="submit" class="search-panel-update-btn">
              Update results
            </button>
          </form>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default DiscussionSearch;
