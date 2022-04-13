import React, { Fragment, useEffect } from "react";
import PubResult from "./PubResult";
import ResultsLoading from "../layout/ResultsLoading";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pubSearch } from "../../actions/search";
import commaSeperateNumber from "../../utils/commaSeperateNumber";

const PublicationResults = ({
  search: {
    pubSearchParams,
    pubSearchResults,
    loading,
    pubNextCursor,
    pubTotalResults,
  },
  pubSearch,
}) => {
  const pageSearch = () => {
    pubSearch(pubSearchParams, pubNextCursor);
  };

  const noSearch = Object.keys(pubSearchParams).length === 0;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (noSearch) {
      pubSearch({ keywords: "", format: "", subject_area: "", field: "" });
    }
  }, [noSearch]);

  const firstLoad = pubSearchResults.length === 0;

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Search publications</h3>
      </div>
      <h4 class="main-title-subheading">
        Explore millions of articles and other publications from a wide range of
        sources.
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
          {pubTotalResults > 0 && (
            <p class="results-stat">
              {commaSeperateNumber(pubTotalResults)} matches
            </p>
          )}
        </div>
        <div class="results-section">
          {pubSearchResults.length === 0 && (
            <h4 className="no-results-msg">
              {noSearch
                ? "Configure your search to find publications"
                : "No results to display"}
            </h4>
          )}
          {pubSearchResults.length > 0 &&
            pubSearchResults.map((result, index) => {
              return (
                <PubResult
                  key={index}
                  title={result.title}
                  URL={result.URL}
                  authors={result.authors}
                  date_published={result.date_published}
                  type={result.type ? result.type : null}
                  abstract={result.abstract}
                  source={result.source}
                />
              );
            })}
        </div>
        {pubSearchResults.length !== 0 && (
          <div className="pagination-controls">
            <div className="page-control-wrapper" onClick={() => pageSearch()}>
              <p className="page-control">Load 20 more</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return firstLoad && loading ? (
    <ResultsLoading firstLoad={firstLoad} />
  ) : !firstLoad && loading ? (
    <Fragment>
      <ResultsLoading firstLoad={firstLoad} />
      {showResults}
    </Fragment>
  ) : (
    showResults
  );
};

PublicationResults.propTypes = {
  search: PropTypes.object.isRequired,
  pubSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { pubSearch })(PublicationResults);
