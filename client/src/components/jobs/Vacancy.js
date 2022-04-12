import React from "react";
import PropTypes from "prop-types";
import commaSeperateNumber from "../../utils/commaSeperateNumber";

const Vacancy = ({
  vacancy: {
    _id,
    user,
    logo,
    organisation,
    contact_name,
    contact_details,
    location,
    title,
    salary,
    salary_currency,
    salary_period,
    ref,
    keywords,
    jd,
    apply_link,
    attachment_links,
    date,
  },
  authUserJob,
}) => {
  return (
    <div class="main-body-container">
      <div class="user-detail-section">
        <div class="user-detail-wrapper">
          <div class="user-avatar-section">
            <div class="recruiter-avatar-wrapper">
              <img src={logo} alt="avatar" class="recruiter-avatar" />
            </div>
          </div>
          <div class="user-info-section">
            <h2 class="user-info-name">{organisation}</h2>
          </div>
        </div>
        {authUserJob && (
          <div class="user-controls-wrapper">
            <button class="create-new-btn" id="create-new-btn">
              New vacancy
            </button>
            <button class="edit-btn discuss-edit-btn">Edit vacancy</button>
            <button class="delete-btn discuss-delete-btn">Delete</button>
          </div>
        )}
      </div>
      <div class="main-content">
        <div class="job-title-wrapper">
          <h3 class="job-title">{title}</h3>
        </div>
        <div class="location-wrapper">
          <h3 class="location">{location}</h3>
        </div>
        <div class="job-detail-container">
          <div class="vacancy-details-summary-container">
            <div class="detail-summary-wrapper">
              <p class="detail-summary-label">Reference:</p>
              <p class="detail-summary">{ref}</p>
            </div>
            <div class="detail-summary-wrapper">
              <p class="detail-summary-label">Salary:</p>
              <p class="detail-summary">{`${salary_currency}${commaSeperateNumber(
                salary
              )} ${salary_period}`}</p>
            </div>
            <div class="detail-summary-wrapper">
              <p class="detail-summary-label">Contact Name:</p>
              <p class="detail-summary">{contact_name}</p>
            </div>
            {contact_details.map((detail) => (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">{`Contact ${detail.form}:`}</p>
                <p class="detail-summary">{detail.detail}</p>
              </div>
            ))}
          </div>
          <div class="job-desc-container">
            <div class="comments-title-wrapper">
              <p class="comments-title">Job Description</p>
            </div>
            <div class="full-content-wrapper">
              <p class="text-content">{jd}</p>
            </div>
          </div>
        </div>
        <div class="comments-title-wrapper">
          <p class="comments-title">Attachments</p>
        </div>
        <div class="vacancy-details-summary-container">
          {attachment_links.map((attachment) => (
            <div class="detail-summary-wrapper attachment-wrapper">
              <p class="detail-summary-label">{`${attachment.form}:`}</p>
              <p class="detail-summary">
                <a href={attachment.link}>{attachment.link}</a>
              </p>
            </div>
          ))}
        </div>
        <a href={apply_link} class="apply-btn vacancy-apply">
          Apply
        </a>
      </div>
    </div>
  );
};

Vacancy.propTypes = {};

export default Vacancy;
