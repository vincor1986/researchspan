import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultsLoading from "../layout/ResultsLoading";
import { getCollection } from "../../actions/collection";
import DiscussionResult from "../discuss/DiscussionResult";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { useNavigate } from "react-router-dom";

const MyDiscussions = ({
  collection: { loading, discussions, lastActionSuccess },
  getCollection,
  user: { discuss_id_array },
}) => {
  const [sentRequest, setSentRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sentRequest && discuss_id_array) {
      getCollection(discuss_id_array, "discussions");
      setSentRequest(true);
    }
  }, [sentRequest, discuss_id_array]);

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">My Discussion Posts</h3>
      </div>
      <h4 class="main-title-subheading">
        View all the discussions and questions you've posted to the community.
        You can view or edit any of your discussions from here.
      </h4>
      <div
        class="main-content-container discuss-main-content"
        id="publication-main-content"
      >
        <div class="sort-wrapper">
          <p class="sort-msg">Sort by:</p>
          <select class="sort-selector">
            <option class="sort-option" value="date">
              date
            </option>
            <option class="sort-option" value="consensus">
              consensus
            </option>
          </select>
        </div>
        <div class="main-content-results-label">
          <h4 class="subheading results-msg">Results</h4>
        </div>
        <div class="results-section">
          {discussions.length === 0 && (
            <h4 className="no-results-msg">
              {"You haven't posted any discussions yet"}
            </h4>
          )}
          {discussions.reverse().map((result, i) => (
            <div className="collection-item-wrapper">
              <div className="hr" />
              <div className="collection-controls">
                <button
                  className="collection-btn edit-btn"
                  onClick={() =>
                    navigate(`/discuss/post/${result._id}`, { replace: false })
                  }
                >
                  view
                </button>
                <button
                  className="collection-btn edit-btn"
                  onClick={() => navigate(`/discuss/post/${result._id}/edit`)}
                >
                  edit
                </button>
              </div>
              <DiscussionResult
                key={i}
                id={result._id}
                user={result.user}
                first_name={result.first_name}
                last_name={result.last_name}
                avatar={result.avatar}
                format={result.format}
                keywords={result.keywords}
                main={result.main}
                context={result.context}
                edited={result.edited}
                responses={result.responses}
                head={result.head}
                consensus_agree={result.consensus_agree}
                consensus_disagree={result.consensus_disagree}
                recommended={result.recommended}
                date={result.date}
                last_edited={result.last_edited}
                organisation={result.organisation || false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return loading || !sentRequest ? <ResultsLoading /> : showResults;
};

MyDiscussions.propTypes = {
  collection: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCollection })(MyDiscussions);
