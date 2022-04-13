import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pubSearch } from "../../actions/search";
import { jobSearch } from "../../actions/search";
import { discussionSearch } from "../../actions/discussion";
import { setActiveTab } from "../../actions/auth";

const Home = ({ pubSearch, setActiveTab, jobSearch, discussionSearch }) => {
  const [pubKeywords, setPubKeywords] = useState("");
  const [jobKeywords, setJobKeywords] = useState("");
  const [discussKeywords, setDiscussKeywords] = useState("");
  const navigate = useNavigate();

  const sendPubSearch = () => {
    pubSearch({
      keywords: pubKeywords,
      format: "",
      subject_area: "",
      field: "",
    });
    setActiveTab("publications");
    navigate("/publications", { replace: false });
  };

  const sendJobSearch = () => {
    jobSearch({
      keywords: jobKeywords,
      location: "",
      subject_area: "",
      field: "",
      currency: "Any",
    });
    setActiveTab("jobs");
    navigate("/jobs", { replace: false });
  };

  const sendDiscussSearch = () => {
    discussionSearch({
      discusssion: true,
      question: true,
      keywords: discussKeywords,
      subject_area: "",
      field: "",
    });
    setActiveTab("discuss");
    navigate("/discuss", { replace: false });
  };

  return (
    <div>
      <header class="hero-header-container">
        <h1 class="hero-title">Research without limits</h1>
        <h4 class="hero-title-subheading">
          Find the research articles and publications you need to move forwards,
          vacancies from a variety of fields and discussions about the latest
          findings - all in one place.
        </h4>
      </header>
      <div class="services-container flex-split">
        <div class="publications-search search-box">
          <h3 class="search-box-title subheading">Discover articles</h3>
          <form class="publications-form form" action="/discuss.html">
            <div class="form-item">
              <label class="search-label" for="search-input">
                Keywords:
              </label>
              <input
                type="text"
                name="search-input"
                class="search-input"
                placeholder="article title, authors, field or topic"
                value={pubKeywords}
                onChange={(e) => setPubKeywords(e.target.value)}
              />
            </div>
            <button
              class="search-btn publication-search-btn"
              onClick={sendPubSearch}
            >
              search
            </button>
          </form>
        </div>
        <div class="vacancies-search search-box">
          <h3 class="search-box-title subheading">Find vacancies</h3>
          <form class="vacancies-form form" onSubmit={sendJobSearch}>
            <div class="form-item">
              <label class="search-label" for="search-input">
                Keywords:
              </label>
              <input
                type="text"
                name="search-input"
                class="search-input"
                value={jobKeywords}
                onChange={(e) => setJobKeywords(e.target.value)}
                placeholder="field, location, job title or reference"
              />
            </div>
            <button class="search-btn vacancies-search-btn" type="submit">
              search
            </button>
          </form>
        </div>
        <div class="discussion-search search-box">
          <h3 class="search-box-title subheading">Engage in discussions</h3>
          <form class="discussion-form form" onSubmit={sendDiscussSearch}>
            <div class="form-item">
              <label class="search-label" for="search-input">
                Keywords:
              </label>
              <input
                type="text"
                name="search-input"
                class="search-input"
                placeholder="field or topic"
                value={discussKeywords}
                onChange={(e) => setDiscussKeywords(e.target.value)}
              />
            </div>
            <button class="search-btn discussion-search-btn" type="submit">
              search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  pubSearch: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  jobSearch: PropTypes.func.isRequired,
  discussionSearch: PropTypes.func.isRequired,
};

export default connect(null, {
  pubSearch,
  setActiveTab,
  jobSearch,
  discussionSearch,
})(Home);
