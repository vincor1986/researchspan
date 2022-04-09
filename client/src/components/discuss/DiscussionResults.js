import React from "react";

const DiscussionResults = () => {
  return (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Search discussions</h3>
      </div>
      <h4 class="main-title-subheading">
        Talk about the latest findings, ask questions, share your thoughts and
        broaden your understanding of key concepts and theories.
      </h4>
      <section class="create-new-section">
        <button class="create-new-btn">New post</button>
        <form class="create-new-form">
          <div class="create-new-container">
            <div class="new-title-wrapper">
              <label class="create-new-label" for="new-type">
                Type:
              </label>
              <select class="new-type">
                <option class="new-type-option" value="discussion">
                  Discussion
                </option>
                <option class="new-type-option" value="question">
                  Question
                </option>
              </select>
              <label class="create-new-label" for="new-title">
                Title:
              </label>
              <textarea
                name="new-title"
                class="edit new-title"
                maxlength="250"
              ></textarea>
              <label class="create-new-label" for="new-context">
                Context:
              </label>
              <textarea
                name="new-context"
                class="edit new-context"
                maxlength="750"
              ></textarea>
              <br />
              <div class="keywords-editor-wrapper">
                <label class="create-new-label">
                  Keywords:
                  <span class="keywords-note">comma-seperated</span>
                </label>
                <input
                  class="edit edit-keywords"
                  id="edit-keywords"
                  maxlength="120"
                  type="text"
                />
              </div>
              <div class="create-new-controls">
                <button class="cancel-btn">Cancel</button>
                <button type="submit" class="create-new-btn">
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <div class="main-content-container discuss-main-content">
        <div class="main-content-tabs">
          <div class="content-tab tab-active">
            <p class="tab-name">ALL</p>
          </div>
          <div class="content-tab">
            <p class="tab-name">DISCUSSIONS</p>
          </div>
          <div class="content-tab">
            <p class="tab-name">QUESTIONS</p>
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
          <p class="results-stat">1,087 matches</p>
        </div>
        <div class="results-section">
          <div class="result">
            <div class="result-user-section">
              <div class="result-user-avatar-section">
                <div class="avatar-wrapper">
                  <img
                    src="./img/default-avatar.png"
                    alt="avatar"
                    class="avatar"
                  />
                </div>
              </div>
              <div class="result-user-info-section">
                <div class="result-info">
                  <div class="info-name-wrapper">
                    <h2 class="info-name">Vincent Coraldean</h2>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Organisation:</p>
                    <p class="info-organisation">Research Span</p>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Date posted:</p>
                    <p class="info-date">
                      Wednesday 6th April 2022 at 12:12pm GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="result-content-section">
              <div class="result-content-type">Discussion</div>
              <div class="result-content-main-section">
                <p class="result-content-main">
                  What improvements can I make to the Research Span website to
                  improve user engagement and user experience?
                </p>
              </div>
              <div class="result-content-context-section">
                <p class="result-content-context">
                  I've just created the Research Span website and I'm looking
                  for advice. I want to know what improvements I can make to the
                  website to help users get the most out of their time one here.
                  I have ...
                </p>
              </div>
              <div class="result-content-info-section">
                <p class="result-content-info">16 Comments</p>
                <p class="result-content-info">
                  Consensus <span class="consensus-score">70%</span>
                </p>
              </div>
            </div>
          </div>
          <div class="result">
            <div class="result-user-section">
              <div class="result-user-avatar-section">
                <div class="avatar-wrapper">
                  <img
                    src="./img/default-avatar.png"
                    alt="avatar"
                    class="avatar"
                  />
                </div>
              </div>
              <div class="result-user-info-section">
                <div class="result-info">
                  <div class="info-name-wrapper">
                    <h2 class="info-name">Juan Lopez</h2>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Organisation:</p>
                    <p class="info-organisation">Blockchain Evolution Inc</p>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Date posted:</p>
                    <p class="info-date">
                      Wednesday 6th April 2022 at 12:12pm GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="result-content-section">
              <div class="result-content-type">Discussion</div>
              <div class="result-content-main-section">
                <p class="result-content-main">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Optio quaerat fugiat nostrum magnam earum voluptatibus, autem
                  asperiores, dolorem illo aperiam cum porro? Reprehenderit,
                  molestiae placeat veniam nobis atque dolore, tenetur suscipit
                  quam numquam quis alias in aperiam exercitationem soluta
                  officiis.
                </p>
              </div>
              <div class="result-content-context-section">
                <p class="result-content-context">
                  I've just created the Research Span website and I'm looking
                  for advice. I want to know what improvements I can make to the
                  website to help users get the most out of their time one here.
                  I have ...
                </p>
              </div>
              <div class="result-content-info-section">
                <p class="result-content-info">16 Comments</p>
                <p class="result-content-info">
                  Consensus <span class="consensus-score">70%</span>
                </p>
              </div>
            </div>
          </div>
          <div class="result">
            <div class="result-user-section">
              <div class="result-user-avatar-section">
                <div class="avatar-wrapper">
                  <img
                    src="./img/default-avatar.png"
                    alt="avatar"
                    class="avatar"
                  />
                </div>
              </div>
              <div class="result-user-info-section">
                <div class="result-info">
                  <div class="info-name-wrapper">
                    <h2 class="info-name">Alexander Graham-Bell</h2>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Organisation:</p>
                    <p class="info-organisation">The Patent Office</p>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Date posted:</p>
                    <p class="info-date">
                      Wednesday 6th April 2022 at 12:12pm GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="result-content-section">
              <div class="result-content-type">Question</div>
              <div class="result-content-main-section">
                <p class="result-content-main">
                  Lorem ipsum dolor sit amet consectetur?
                </p>
              </div>
              <div class="result-content-context-section">
                <p class="result-content-context">
                  I've just created the Research Span website and I'm looking
                  for advice. I want to know what improvements I can make to the
                  website to help users get the most out of their time one here.
                  I have ...
                </p>
              </div>
              <div class="result-content-info-section">
                <p class="result-content-info">16 Comments</p>
                <p class="result-content-info">
                  Consensus <span class="consensus-score">70%</span>
                </p>
              </div>
            </div>
          </div>
          <div class="result">
            <div class="result-user-section">
              <div class="result-user-avatar-section">
                <div class="avatar-wrapper">
                  <img
                    src="./img/default-avatar.png"
                    alt="avatar"
                    class="avatar"
                  />
                </div>
              </div>
              <div class="result-user-info-section">
                <div class="result-info">
                  <div class="info-name-wrapper">
                    <h2 class="info-name">Vincent Coraldean</h2>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Organisation:</p>
                    <p class="info-organisation">Research Span</p>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Date posted:</p>
                    <p class="info-date">
                      Wednesday 6th April 2022 at 12:12pm GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="result-content-section">
              <div class="result-content-type">Discussion</div>
              <div class="result-content-main-section">
                <p class="result-content-main">
                  What improvements can I make to the Research Span website to
                  improve user engagement and user experience?
                </p>
              </div>
              <div class="result-content-context-section">
                <p class="result-content-context">
                  I've just created the Research Span website and I'm looking
                  for advice. I want to know what improvements I can make to the
                  website to help users get the most out of their time one here.
                  I have ...
                </p>
              </div>
              <div class="result-content-info-section">
                <p class="result-content-info">16 Comments</p>
                <p class="result-content-info">
                  Consensus <span class="consensus-score">70%</span>
                </p>
              </div>
            </div>
          </div>
          <div class="result">
            <div class="result-user-section">
              <div class="result-user-avatar-section">
                <div class="avatar-wrapper">
                  <img
                    src="./img/default-avatar.png"
                    alt="avatar"
                    class="avatar"
                  />
                </div>
              </div>
              <div class="result-user-info-section">
                <div class="result-info">
                  <div class="info-name-wrapper">
                    <h2 class="info-name">Vincent Coraldean</h2>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Organisation:</p>
                    <p class="info-organisation">Research Span</p>
                  </div>
                  <div class="info-subsection">
                    <p class="info-label">Date posted:</p>
                    <p class="info-date">
                      Wednesday 6th April 2022 at 12:12pm GMT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="result-content-section">
              <div class="result-content-type">Discussion</div>
              <div class="result-content-main-section">
                <p class="result-content-main">
                  What improvements can I make to the Research Span website to
                  improve user engagement and user experience?
                </p>
              </div>
              <div class="result-content-context-section">
                <p class="result-content-context">
                  I've just created the Research Span website and I'm looking
                  for advice. I want to know what improvements I can make to the
                  website to help users get the most out of their time one here.
                  I have ...
                </p>
              </div>
              <div class="result-content-info-section">
                <p class="result-content-info">16 Comments</p>
                <p class="result-content-info">
                  Consensus <span class="consensus-score">70%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionResults;
