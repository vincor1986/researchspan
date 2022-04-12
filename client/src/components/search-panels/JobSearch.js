import React, { Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { jobSearch } from "../../actions/search";
import getFields from "../../utils/getFields";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const JobSearch = ({ search: { jobSearchParams }, jobSearch }) => {
  const [formData, setFormData] = useState({
    keywords: "",
    location: "",
    subject_area: "",
    field: "",
    currency: "Any",
  });

  const { keywords, location, subject_area, field, currency } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    jobSearch({ keywords, location, subject_area, field, currency });
  };

  useEffect(() => {
    if (jobSearchParams.keywords) {
      setFormData({ ...formData, keywords: jobSearchParams.keywords });
    }
  }, [jobSearchParams]);

  return (
    <Fragment>
      {" "}
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
                name="keywords"
                type="text"
                value={keywords}
                placeholder="job title, location or field"
                onChange={(e) => onChange(e)}
              />
            </div>
            <h4 class="search-panel-subheading">Location</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-text-input" class="search-panel-label">
                Enter city or region
              </label>
              <input
                class="search-panel-text-input"
                name="location"
                type="text"
                placeholder="city, country or region"
                value={location}
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
            <h4 class="search-panel-subheading">Salary Currency</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-select-input" class="search-panel-label">
                Currency
              </label>
              <select
                class="search-panel-text-input"
                name="currency"
                value={currency}
                onChange={(e) => onChange(e)}
              >
                <option class="search-panel-select-option" value="Any">
                  Any
                </option>
                <option class="search-panel-select-option" value="£">
                  £
                </option>
                <option class="search-panel-select-option" value="$">
                  $
                </option>
                <option class="search-panel-select-option" value="€">
                  €
                </option>
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

JobSearch.propTypes = {
  search: PropTypes.object.isRequired,
  jobSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { jobSearch })(JobSearch);
