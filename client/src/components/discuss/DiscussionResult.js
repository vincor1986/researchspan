import React from "react";
import PropTypes from "prop-types";

const DiscussionResult = ({
  id,
  user,
  first_name,
  last_name,
  avatar,
  format,
  keywords,
  main,
  context,
  date,
  edited,
  consensus_agree,
  consensus_disagree,
  recommended,
  responses,
  head,
  last_edited,
  organisation,
}) => {
  const consScore =
    Math.round(
      (+consensus_agree / (+consensus_agree + +consensus_disagree)) * 100
    ) || "-";

  return (
    <div class="result">
      <div class="result-user-section">
        <div class="result-user-avatar-section">
          <div class="avatar-wrapper">
            <img src={avatar} alt="avatar" class="avatar" />
          </div>
        </div>
        <div class="result-user-info-section">
          <div class="result-info">
            <div class="info-name-wrapper">
              <h2 class="info-name">{`${first_name} ${last_name}`}</h2>
            </div>
            {organisation && (
              <div class="info-subsection">
                <p class="info-label">Organisation:</p>
                <p class="info-organisation">{organisation}</p>
              </div>
            )}
            <div class="info-subsection">
              <p class="info-label">Date posted:</p>
              <p class="info-date">{Date(date).toString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="result-content-section">
        <div class="result-content-type">{format}</div>
        <div class="result-content-main-section">
          <p class="result-content-main">{main}</p>
        </div>
        <div class="result-content-context-section">
          <p class="result-content-context">{context}</p>
        </div>
        <div class="result-content-info-section">
          <p class="result-content-info">{`${responses.length} Comments`}</p>
          <p class="result-content-info">
            Consensus <span class="consensus-score">{`${consScore}%`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

DiscussionResult.propTypes = {};

export default DiscussionResult;
