import React from "react";
import PropTypes from "prop-types";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { Link } from "react-router-dom";
import newWindowIcon from "../../img/icons/new-window.png";
import moment from "moment";

const JobResult = ({
  _id,
  logo,
  title,
  organisation,
  location,
  salary_currency,
  salary,
  salary_period,
  closing_date,
  jd,
  apply_link,
}) => {
  return (
    <div class="result">
      <div class="result-user-section job-detail-section">
        <div class="result-user-avatar-section" id="recruiter-avatar-section">
          <div class="recruiter-avatar-wrapper">
            <img src={logo} class="avatar" alt="logo" />
          </div>
        </div>
        <div class="result-user-info-section vacancy-info">
          <div class="result-info">
            <div class="info-name-wrapper">
              <Link to={`/jobs/${_id}`} class="info-name">
                {title}
              </Link>
            </div>
            <div class="info-subsection">
              <p class="info-label">Organisation:</p>
              <p class="info-organisation">{organisation}</p>
            </div>
            {location && (
              <div class="info-subsection">
                <p class="info-label">Location:</p>
                <p class="info-organisation">{location}</p>
              </div>
            )}
            {salary && salary_period && salary_currency && (
              <div class="info-subsection">
                <p class="info-label">Salary:</p>
                <p class="info-organisation">{`${salary_currency}${commaSeperateNumber(
                  salary
                )} ${salary_period}`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="result-content-section">
        <div class="result-content-closing">
          Closing date:
          <span class="closing-date">
            {"  " + moment(closing_date).format("MMMM Do YYYY")}
          </span>
        </div>
        <div class="result-content-context-section">
          <p class="result-content-context">
            {jd.length > 349 ? `${jd.substring(0, 350)}...` : jd}
          </p>
        </div>
        <div
          class="result-job-apply-section"
          id="publications-apply-controls-wrapper"
        >
          <Link to={`/jobs/${_id}`} class="more-info-btn apply-btn">
            More info
          </Link>
          <a href={apply_link} class="apply-link-btn apply-btn">
            <p class="btn-text">Apply link</p>
            <img class="btn-icon" src={newWindowIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

JobResult.propTypes = {};

export default JobResult;
