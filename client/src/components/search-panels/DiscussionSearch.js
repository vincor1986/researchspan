import React, { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { discussionSearch } from "../../actions/discussion";
import getFields from "../../utils/getFields";
import magGlass from "../../img/icons/mag_glass.png";

const DiscussionSearch = ({
  discussionSearch,
  search: { discussSearchParams },
}) => {
  const [searchData, setSearchData] = useState({
    keywords: discussSearchParams.keywords || "",
    discussion: true,
    question: true,
    subject_area: "",
    field: "",
  });

  const { keywords, discussion, question, subject_area, field } = searchData;
  const [showSearch, setShowSearch] = useState(false);

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    discussionSearch({ keywords, discussion, question, subject_area, field });
    setShowSearch(false);
  };

  return (
    <Fragment>
      {" "}
      <div class={`search-panel discuss-search-panel ${showSearch && "slide"}`}>
        <div class="show-search-tab" onClick={() => setShowSearch(!showSearch)}>
          {showSearch ? (
            <Fragment>
              <img class="mag-glass-icon" src={magGlass} alt="mag glass icon" />
            </Fragment>
          ) : (
            <Fragment>
              <img class="mag-glass-icon" src={magGlass} alt="mag glass icon" />
            </Fragment>
          )}
        </div>
        <div class="search-panel-title">
          <p>Configure your search</p>
        </div>
        <div class="search-panel-form-wrapper">
          <form class="search-panel-form" onSubmit={onSubmit}>
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
                  name="discussion"
                  checked={discussion}
                  onChange={(e) => handleCheckboxChange(e)}
                />
              </div>
              <div class="search-panel-checkbox-item">
                <label for="show-questions-checkbox" class="search-panel-label">
                  Questions
                </label>
                <input
                  type="checkbox"
                  class="checkbox"
                  name="question"
                  checked={question}
                  onChange={(e) => handleCheckboxChange(e)}
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
                name="keywords"
                type="text"
                placeholder="field, subject or topic"
                value={keywords}
                onChange={(e) => onChange(e)}
              />
            </div>
            <h4 class="search-panel-subheading">Subject {"&"} Field</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-select-input" class="search-panel-label">
                Subject
              </label>
              <select
                class="search-panel-text-input"
                id="search-panel-select-input"
                name="subject_area"
                value={subject_area}
                onChange={(e) => onChange(e)}
              >
                <option class="search-panel-select-option">Select...</option>
                <option class="search-panel-select-option">Biology</option>
                <option class="search-panel-select-option">
                  Computer Science
                </option>
                <option class="search-panel-select-option">Economics</option>
                <option class="search-panel-select-option">
                  Electrical Engineering
                </option>
                <option class="search-panel-select-option">Finance</option>
                <option class="search-panel-select-option">Mathematics</option>
                <option class="search-panel-select-option">Physics</option>
                <option class="search-panel-select-option">Statistics</option>
              </select>
              <label for="search-panel-select-input" class="search-panel-label">
                Field
              </label>
              <select
                class="search-panel-text-input"
                id="search-panel-select-input"
                name="field"
                value={field}
                onChange={(e) => onChange(e)}
                disabled={["Select...", ""].includes(subject_area)}
              >
                {!["Select...", ""].includes(subject_area) &&
                  getFields(subject_area)
                    .sort()
                    .map((item, index) => (
                      <option key={index} class="search-panel-select-option">
                        {item}
                      </option>
                    ))}
              </select>
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

DiscussionSearch.propTypes = {
  search: PropTypes.object.isRequired,
  discussionSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { discussionSearch })(DiscussionSearch);
