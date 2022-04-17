import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import defaultLogo from "../../img/default-logo.png";
import { deleteItem } from "../../actions/items";
import { connect } from "react-redux";
import { toggleShortlistJob } from "../../actions/jobs";

const Vacancy = ({
  vacancy: {
    _id,
    user,
    logo,
    organisation,
    contact_name,
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
    fixed_term_length,
    contact_phone,
    contact_email,
    closing_date,
  },
  authUserJob,
  deleteItem,
  toggleShortlistJob,
  items: { loading, lastActionSuccess },
  auth,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sentDeleteReq, setSentDeleteReq] = useState(false);

  const navigate = useNavigate();

  const onDelete = () => {
    deleteItem(_id, "job");
    setSentDeleteReq(true);
  };

  useEffect(() => {
    if (!loading && sentDeleteReq && lastActionSuccess) {
      navigate("/jobs/myjobs", { replace: true });
    }
  }, [loading, lastActionSuccess, sentDeleteReq]);

  return (
    <div class="main-body-container">
      <div class="user-detail-section">
        <div class="user-detail-wrapper">
          <div class="user-avatar-section">
            <div class="recruiter-avatar-wrapper">
              <img
                src={logo || defaultLogo}
                alt="avatar"
                class="recruiter-avatar"
              />
            </div>
          </div>
          <div class="user-info-section">
            <h2 class="user-info-name" id="recruiter-org">
              {organisation}
            </h2>
          </div>
        </div>
        <div class="user-controls-wrapper">
          {!authUserJob && auth.user.account_type !== "recruiter" && (
            <button
              class="edit-btn discuss-edit-btn shortlist-btn"
              onClick={() => toggleShortlistJob(_id)}
            >
              {!auth.user.shortlist.vacancies.includes(_id)
                ? "Shortlist ★"
                : "Unshortlist -★"}
            </button>
          )}
          {authUserJob && (
            <Fragment>
              <button class="create-new-btn" id="create-new-btn">
                Post new
              </button>
              <button
                class="edit-btn discuss-edit-btn"
                onClick={() => navigate(`edit`, { replace: false })}
              >
                Edit
              </button>
              <button
                class="delete-btn discuss-delete-btn"
                onClick={() => setShowConfirmDelete(true)}
              >
                Delete
              </button>
            </Fragment>
          )}
        </div>
        {showConfirmDelete && (
          <div className="confirm-delete-wrapper">
            <h3 className="confirm-delete-msg">Confirm delete</h3>
            <div className="confirm-delete-btns-wrapper">
              <button
                class="edit-btn discuss-edit-btn"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
              <button class="delete-btn discuss-delete-btn" onClick={onDelete}>
                Delete
              </button>
            </div>
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
            {salary && salary_currency && salary_period && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Salary:</p>
                <p class="detail-summary">{`${salary_currency}${commaSeperateNumber(
                  salary
                )} ${salary_period}`}</p>
              </div>
            )}
            {salary_currency && (!salary || !salary_period) && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Salary currency:</p>
                <p class="detail-summary">{salary_currency}</p>
              </div>
            )}
            {fixed_term_length && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Fixed-term length:</p>
                <p class="detail-summary">{fixed_term_length}</p>
              </div>
            )}
            {contact_name && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact Name:</p>
                <p class="detail-summary">{contact_name}</p>
              </div>
            )}
            {contact_phone && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact phone:</p>
                <p class="detail-summary">{contact_phone}</p>
              </div>
            )}
            {contact_email && (
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact email:</p>
                <p class="detail-summary">
                  <a href={`mailto:${contact_email}`}>{contact_email}</a>
                </p>
              </div>
            )}
            <div class="detail-summary-wrapper">
              <p class="detail-summary-label">Closing date:</p>
              <p class="detail-summary">
                {moment(closing_date).format("Do MMMM YYYY")}
              </p>
            </div>
          </div>
          <div class="job-desc-container">
            <div class="comments-title-wrapper">
              <p class="comments-title">Job Description</p>
            </div>
            <div class="full-content-wrapper">
              {jd.split("\n").map((content) => (
                <Fragment>
                  <p class="text-content">{content}</p>
                  <br />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {attachment_links.lenght > 0 && (
          <Fragment>
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
          </Fragment>
        )}
        <a href={apply_link} class="apply-btn vacancy-apply">
          Apply
        </a>
      </div>
    </div>
  );
};

Vacancy.propTypes = {
  items: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleShortlistJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteItem, toggleShortlistJob })(
  Vacancy
);
