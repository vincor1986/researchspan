import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const PubSearch = () => {
  return (
    <Fragment>
      <div class="search-panel discuss-search-panel">
        <div class="search-panel-title">
          <p>Configure your search</p>
        </div>
        <div class="search-panel-form-wrapper">
          <form class="search-panel-form">
            <h4 class="search-panel-subheading">Keywords</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-text-input" class="search-panel-label">
                Search
              </label>
              <input
                class="search-panel-text-input"
                name="search-panel-text-input"
                type="text"
                placeholder="article title, authors, field or subject"
              />
            </div>
            <h4 class="search-panel-subheading">Format</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-select-input" class="search-panel-label">
                Type of Publication
              </label>
              <select
                class="search-panel-text-input"
                name="search-panel-select-input"
              >
                <option class="search-panel-select-option" value="article">
                  Article
                </option>
                <option
                  class="search-panel-select-option"
                  value="clinical case study"
                >
                  Clinical Case Study
                </option>
                <option
                  class="search-panel-select-option"
                  value="original research"
                >
                  Original Research
                </option>
              </select>
            </div>
            <h4 class="search-panel-subheading">Subject {"&"} Field</h4>
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

export default PubSearch;
