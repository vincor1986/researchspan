import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ResultsLoading from "../layout/ResultsLoading";
import { getCollection } from "../../actions/collection";
import RsPubResult from "../publications/RsPubResult";
import commaSeperateNumber from "../../utils/commaSeperateNumber";
import { useNavigate } from "react-router-dom";

const MyPublications = ({
  collection: { loading, publications, lastActionSuccess },
  getCollection,
  user: { pub_id_array },
}) => {
  const [sentRequest, setSentRequest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sentRequest && pub_id_array) {
      getCollection(pub_id_array, "publications");
      setSentRequest(true);
    }
  }, [sentRequest, pub_id_array]);

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">My publications</h3>
      </div>
      <h4 class="main-title-subheading">
        These are the publications you have added. View or edit any of your
        publications here.
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
          <h4 class="subheading results-msg">Publications</h4>
          {publications.length > 0 && (
            <p class="results-stat">
              {commaSeperateNumber(publications.length)} matches
            </p>
          )}
        </div>
        <div class="results-section">
          {publications.length === 0 && (
            <h4 className="no-results-msg">
              {"You currently have no publications posted"}
            </h4>
          )}
          {publications.length > 0 &&
            publications.map((result, index) => (
              <div className="collection-item-wrapper">
                <div className="hr" />
                <div className="collection-controls">
                  <button
                    className="collection-btn edit-btn"
                    onClick={() =>
                      navigate(`/publications/${result._id}`, {
                        replace: false,
                      })
                    }
                  >
                    view
                  </button>
                  <button
                    className="collection-btn edit-btn"
                    onClick={() => navigate(`/publications/${result._id}/edit`)}
                  >
                    edit
                  </button>
                </div>
                <RsPubResult
                  key={index}
                  title={result.title}
                  link={result.link}
                  coauthors={result.coauthors}
                  connectedUsers={result.connectedUsers}
                  date_published={result.date}
                  type={result.type}
                  abstract={null}
                  journal={result.journal}
                  issue={result.issue}
                  DOI={result.DOI}
                  PMID={result.PMID}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return loading || !sentRequest ? <ResultsLoading /> : showResults;
};

MyPublications.propTypes = {
  collection: PropTypes.object.isRequired,
  getCollection: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getCollection })(MyPublications);
