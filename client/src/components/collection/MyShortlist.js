import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultsLoading from "../layout/ResultsLoading";
import { getCollection } from "../../actions/collection";
import JobResult from "../jobs/JobResult";
import defaultLogo from "../../img/default-logo.png";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { useNavigate } from "react-router-dom";
import { toggleShortlistJob } from "../../actions/jobs";

const MyShortlist = ({
  collection: { loading, jobs, lastActionSuccess },
  getCollection,
  user: { shortlist },
  userLoading,
  toggleShortlistJob,
}) => {
  const [sentRequest, setSentRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !sentRequest && shortlist.vacancies) {
      getCollection(shortlist.vacancies, "jobs");
      setSentRequest(true);
      console.log("shortlist", shortlist);
    }
  }, [sentRequest, shortlist, userLoading, loading]);

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">My Shortlisted vacancies</h3>
      </div>
      <h4 class="main-title-subheading">
        These are the vacancies you've added to your shortlist.
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
          <h4 class="subheading results-msg">Vacancies</h4>
          <p class="results-stat">{`${commaSeperateNumber(
            jobs.length
          )} matches`}</p>
        </div>
        <div class="results-section">
          {jobs.length === 0 && (
            <h4 className="no-results-msg">
              {"You currently have no vacancies being advertised"}
            </h4>
          )}
          {jobs.length > 0 &&
            jobs.reverse().map(
              (result, index) =>
                shortlist.vacancies.includes(result._id) && (
                  <div className="collection-item-wrapper">
                    <div className="hr" />
                    <div className="collection-controls">
                      <button
                        className="collection-btn edit-btn"
                        onClick={() =>
                          navigate(`/jobs/${result._id}`, { replace: false })
                        }
                      >
                        view
                      </button>
                      <button
                        className="collection-btn edit-btn remove-shortlist-btn"
                        onClick={() => toggleShortlistJob(result._id)}
                      >
                        remove
                      </button>
                    </div>
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
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );

  return loading || !sentRequest ? <ResultsLoading /> : showResults;
};

MyShortlist.propTypes = {
  collection: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  toggleShortlistJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  user: state.auth.user,
  userLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getCollection, toggleShortlistJob })(
  MyShortlist
);
