import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

export const JobSearch = () => {
  return (
    <Fragment>
      {" "}
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
                placeholder="job title, location or field"
              />
            </div>
            <h4 class="search-panel-subheading">Location</h4>
            <div class="search-panel-wrapper">
              <label for="search-panel-text-input" class="search-panel-label">
                Enter city or region
              </label>
              <input
                class="search-panel-text-input"
                name="search-panel-text-input"
                type="text"
                placeholder="city, country or region"
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
              <h4 class="search-panel-subheading">Salary Currency</h4>
            </div>
            <div class="search-panel-wrapper">
              <label for="search-panel-select-input" class="search-panel-label">
                Currency
              </label>
              <select
                class="search-panel-text-input"
                name="search-panel-select-input"
              >
                <option class="search-panel-select-option" value="£">
                  £
                </option>
                <option class="search-panel-select-option" value="$">
                  $
                </option>
                <option class="search-panel-select-option" value="€">
                  €
                </option>
                <option class="search-panel-select-option">
                  Business {"&"} Industry
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

export default JobSearch;
