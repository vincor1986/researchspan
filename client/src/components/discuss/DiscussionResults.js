import React, { Fragment, useState, useEffect } from "react";
import NewDiscussionForm from "./NewDiscussionForm";
import DiscussionResult from "./DiscussionResult";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResultsLoading from "../layout/ResultsLoading";
import { discussionSearch } from "../../actions/discussion";

const DiscussionResults = ({
  search: { loading, discussSearchParams, discussSearchResults },
}) => {
  const [displayNewPostForm, setDisplayNewPostForm] = useState(false);
  const [view, setView] = useState("all");

  const totalQuestions = discussSearchResults.filter(
    (obj) => obj.format === "question"
  ).length;
  const totalDiscussions = discussSearchResults.filter(
    (obj) => obj.format === "discussion"
  ).length;

  const filterCriteria =
    view === "all"
      ? ["question", "discussion"]
      : view === "discussion"
      ? ["discussion"]
      : ["question"];

  const toggleNewPostDisplay = () => {
    setDisplayNewPostForm(!displayNewPostForm);
  };

  const setTab = (e) => {
    setView(e.target.id);
  };

  const noSearch = Object.keys(discussSearchParams).length === 0;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (noSearch) {
      discussionSearch({
        question: true,
        discussion: true,
        keywords: "",
        field: "",
        subject_area: "",
      });
    }
  }, [noSearch]);

  const firstLoad = discussSearchResults.length === 0;

  const noResults =
    discussSearchResults.length === 0 ||
    (view === "discussion" && totalDiscussions === 0) ||
    (view === "question" && totalQuestions === 0);

  const showResults = (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Search discussions</h3>
      </div>
      <h4 class="main-title-subheading">
        Talk about the latest findings, ask questions, share your thoughts and
        broaden your understanding of key concepts and theories.
      </h4>
      <section class="create-new-section">
        {!displayNewPostForm && (
          <button class="create-new-btn" onClick={toggleNewPostDisplay}>
            New post
          </button>
        )}
        {displayNewPostForm && (
          <NewDiscussionForm toggle={toggleNewPostDisplay} />
        )}
      </section>
      <div class="main-content-container discuss-main-content">
        <div class="main-content-tabs">
          <div
            class={`content-tab ${view === "all" && "tab-active"}`}
            id="all"
            onClick={(e) => setTab(e)}
          >
            <p class="tab-name noselect" id="all" onClick={(e) => setTab(e)}>
              ALL
            </p>
          </div>
          <div
            class={`content-tab ${view === "discussion" && "tab-active"}`}
            id="discussion"
            onClick={(e) => setTab(e)}
          >
            <p
              class="tab-name noselect"
              id="discussion"
              onClick={(e) => setTab(e)}
            >
              DISCUSSIONS
            </p>
          </div>
          <div
            class={`content-tab ${view === "question" && "tab-active"}`}
            id="question"
            onClick={(e) => setTab(e)}
          >
            <p
              class="tab-name noselect"
              id="question"
              onClick={(e) => setTab(e)}
            >
              QUESTIONS
            </p>
          </div>
        </div>
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
          {noResults && (
            <h4 className="no-results-msg">
              {noSearch
                ? "Configure your search to find publications"
                : "No results to display"}
            </h4>
          )}
          {discussSearchResults
            .filter((obj) => filterCriteria.includes(obj.format))
            .map((result, i) => (
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
            ))}
        </div>
      </div>
    </div>
  );

  return firstLoad & loading ? (
    <ResultsLoading firstLoad={firstLoad} />
  ) : !firstLoad & loading ? (
    <Fragment>
      <ResultsLoading firstLoad={firstLoad} />
      {showResults}
    </Fragment>
  ) : (
    showResults
  );
};

DiscussionResults.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(DiscussionResults);
