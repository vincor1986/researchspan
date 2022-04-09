import React from "react";
import PubResult from "./PubResult";
import ResultsLoading from "../layout/ResultsLoading";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PublicationResults = ({ search: { pubSearchResults, loading } }) => {
  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Search publications</h3>
      </div>
      <h4 class="main-title-subheading">
        Explore articles and other publications from a range of sources, with
        the knowledge that if a result appears in this search, you'll be able to
        freely access the full publication.
      </h4>
      <div
        class="main-content-container discuss-main-content"
        id="publication-main-content"
      >
        <div class="sort-wrapper" id="publications-sort-wrapper">
          <p class="sort-msg">Sort by:</p>
          <select class="sort-selector">
            <option class="sort-option" value="date-posted">
              date
            </option>
            <option class="sort-option" value="salary">
              relevance
            </option>
            <option class="sort-option" value="closing-date">
              format
            </option>
          </select>
        </div>
        <div class="main-content-results-label">
          <h4 class="subheading results-msg">Results</h4>
          <p class="results-stat">{pubSearchResults.length} matches</p>
        </div>
        <div class="results-section">
          {pubSearchResults.map((result, index) => {
            return (
              <PubResult
                key={index}
                title={result.title}
                URL={result.URL}
                authors={result.authors}
                date_published={result.date_published}
                type={result.type ? result.type : null}
                abstract={result.abstract}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return loading ? <ResultsLoading /> : showResults;
};

PublicationResults.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(PublicationResults);
