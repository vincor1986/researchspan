import React, { Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { pubSearch } from "../../actions/search";
import getFields from "../../utils/getFields";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PubSearch = ({
  pubSearch,
  search: { pubSearchResults, loading, pubSearchParams },
}) => {
  const [searchData, setSearchData] = useState({
    keywords: "",
    format: "",
    subject_area: "",
    field: "",
  });

  const { keywords, format, subject_area, field } = searchData;

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    pubSearch({ keywords, format, subject_area, field });
  };

  useEffect(() => {
    if (field === "Select...") {
      setSearchData({ ...searchData, field: "" });
    }
    if (format === "Select...") {
      setSearchData({ ...searchData, field: "" });
    }
  }, [field]);

  return (
    <Fragment>
      <div class="search-panel discuss-search-panel">
        <div class="search-panel-title">
          <p>Configure your search</p>
        </div>
        <div class="search-panel-form-wrapper">
          <form class="search-panel-form" onSubmit={(e) => onSubmit(e)}>
            <h4 class="search-panel-subheading">Keywords</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-text-input" class="search-panel-label">
                Search
              </label>
              <input
                class="search-panel-text-input"
                id="search-panel-text-input"
                name="keywords"
                value={keywords}
                onChange={(e) => onChange(e)}
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
                id="search-panel-select-input"
                name="format"
                value={format}
                onChange={(e) => onChange(e)}
              >
                <option class="search-panel-select-option" value="Select...">
                  Select...
                </option>
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

PubSearch.propTypes = {
  search: PropTypes.object.isRequired,
  pubSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { pubSearch })(PubSearch);
