import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../img/default-avatar.png";
import newWindowIcon from "../../img/icons/new-window.png";

const PubResult = ({ title, date_published, authors, abstract, type, URL }) => {
  return (
    <div class="result">
      <div class="result-publication-content-section">
        <h4 class="result-publication-title">{title}</h4>
        <div class="result-publication-details">
          <div class="result-publication-detail-wrapper">
            <div class="result-publication-date">
              {date_published
                ? date_published["date-parts"]
                  ? date_published["date-parts"][0][0]
                  : Date(date_published)
                      .split(" ")
                      .slice(1, 4)
                      .splice(1, 1)
                      .join(" ")
                : ""}
            </div>
            {type ? <div class="tag">{type}</div> : ""}
          </div>
          <div class="result-all-authors-wrapper">
            {authors &&
              authors.map((author) => {
                return (
                  <div class="result-author-wrapper">
                    <div class="result-author-avatar-wrapper">
                      <img class="result-author-avatar" src={defaultAvatar} />
                    </div>
                    <p class="result-author">
                      {author.given
                        ? `${author.given} ${author.family}`
                        : author[0]}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div class="result-content-context-section">
          {abstract && (
            <p
              class="result-content-context abstract-text"
              innerText={abstract
                .replace(/<jats:p>/g, "")
                .replace(/<\/jats:p>/)}
            >
              <strong>Abstract:</strong>{" "}
              {abstract
                .replace(/<jats:p>/g, "")
                .replace(/<\/jats:p>/)
                .replace(/<p>/g, "")
                .replace(/<\/p>/g, "")
                .replace(/<italic>/g, "")
                .replace(/<\/italic>/g, "")}
            </p>
          )}
        </div>
        <div
          class="result-job-apply-section"
          id="publications-apply-controls-wrapper"
        >
          {/* <button class="more-info-btn apply-btn">More info</button> */}
          <a
            href={URL}
            target="_blank"
            rel="external noopener"
            referrerPolicy="no-referrer"
            class="apply-link-btn apply-btn link-btn"
          >
            <p class="btn-text">More info</p>
            <img class="btn-icon" src={newWindowIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PubResult;
