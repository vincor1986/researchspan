import React, { Fragment, useState, useEffect } from "react";
import JobResult from "./JobResult";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import ResultsLoading from "../layout/ResultsLoading";
import { getAllJobs } from "../../actions/jobs";
import defaultLogo from "../../img/default-logo.png";

const JobResults = ({
  search: { loading, jobSearchParams, jobTotalResults, jobSearchResults },
  getAllJobs,
}) => {
  const [resultQty, setResultQty] = useState(10);

  const showMoreResults = () => {
    setResultQty((prev) => prev + 10);
  };

  const noSearch = Object.keys(jobSearchParams).length === 0;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (noSearch) {
      getAllJobs();
    }
  }, [noSearch, getAllJobs]);

  const firstLoad = jobSearchResults.length === 0;

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Search vacancies</h3>
      </div>
      <h4 class="main-title-subheading">
        Discover your dream job in research, find that next move or just browse
        available opportunities around the world.
      </h4>
      <div
        class="main-content-container discuss-main-content"
        id="publication-main-content"
      >
        <div class="sort-wrapper" id="publications-sort-wrapper">
          <p class="sort-msg">Sort by:</p>
          <select class="sort-selector">
            <option class="sort-option" value="date-posted">
              date posted
            </option>
            <option class="sort-option" value="salary">
              salary
            </option>
            <option class="sort-option" value="closing-date">
              closing date
            </option>
          </select>
        </div>
        <div class="main-content-results-label">
          <h4 class="subheading results-msg">Results</h4>
          <p class="results-stat">{`${commaSeperateNumber(
            jobSearchResults.length
          )} matches`}</p>
        </div>
        <div class="results-section">
          {jobSearchResults.length === 0 && (
            <h4 className="no-results-msg">
              {noSearch
                ? "Configure your search to find publications"
                : "No results to display"}
            </h4>
          )}
          {jobSearchResults.length > 0 &&
            jobSearchResults.map((result, index) => {
              return (
                <JobResult
                  key={index}
                  _id={result._id}
                  user={result.user}
                  organisation={result.organisation}
                  contact_name={result.contact_name}
                  contact_email={result.contact_email}
                  contact_phone={result.contact_phone}
                  title={result.title}
                  salary={result.salary}
                  salary_currency={result.salary_currency}
                  salary_period={result.salary_period}
                  reference={result.ref}
                  keywords={result.keywords}
                  jd={result.jd}
                  apply_link={result.apply_link}
                  attachment_links={result.attachment_links}
                  date_posted={result.date}
                  closing_date={result.closing_date}
                  logo={result.logo || defaultLogo}
                />
              );
            })}
        </div>
        {resultQty < jobSearchResults.length && (
          <div className="pagination-controls">
            <div className="page-control-wrapper" onClick={showMoreResults}>
              <p className="page-control">Load 10 more</p>
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

JobResults.propTypes = {
  search: PropTypes.object.isRequired,
  getAllJobs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getAllJobs })(JobResults);
