import React, { useState } from "react";
import PropTypes from "prop-types";
import chevron from "../../img/icons/chevron.png";
import NotifcationsBox from "./NotifcationsBox";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserMenu = ({ isAuthenticated, setShowUserMenu, logout, user }) => {
  const [showAccounts, setShowAccounts] = useState(false);
  const [showPub, setShowPub] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showDiscuss, setShowDiscuss] = useState(false);

  const hasNotifications = user.notifications && user.notifications.length > 0;

  const isRecruiter = user.account_type === "recruiter";

  const navigate = useNavigate();

  return (
    <div class="burger-menu-container">
      <p class="close-burger-menu" onClick={() => setShowUserMenu(false)}>
        ✖
      </p>
      {isAuthenticated && hasNotifications && (
        <NotifcationsBox notifications={user.notifications.slice(0, 3)} />
      )}
      {!isAuthenticated && (
        <div class="bm-section">
          <label for="bm-account">
            <div class="comments-title-wrapper">
              <p class="comments-title" id="bm-title">
                Account
                <img
                  class={`chevron ${showAccounts && "rotate-chevron"}`}
                  id="pub-chevron"
                  src={chevron}
                  attribute="pub"
                />
              </p>
            </div>
          </label>
          <input
            type="checkbox"
            id="bm-account"
            class="bm-checkbox"
            onChange={(e) => setShowAccounts(e.target.checked)}
          />
          <div class="bm-section-wrapper">
            <div class="burger-menu-item" id="bm-account">
              <div class="burger-menu-marker"></div>
              <h4 class="burger-menu-link">Login</h4>
            </div>
            <div class="burger-menu-item" id="account-links">
              <div class="burger-menu-marker"></div>
              <h4 class="burger-menu-link">Register</h4>
            </div>
          </div>
        </div>
      )}
      <div class="bm-section">
        <label for="bm-pub">
          <div class="comments-title-wrapper">
            <p class="comments-title" id="bm-title">
              Publications
              <img
                class={`chevron ${showPub && "rotate-chevron"}`}
                id="pub-chevron"
                src={chevron}
                attribute="pub"
              />
            </p>
          </div>
        </label>
        <input
          type="checkbox"
          id="bm-pub"
          class="bm-checkbox"
          onChange={(e) => setShowPub(e.target.checked)}
        />
        <div class="bm-section-wrapper">
          <div class="burger-menu-item" id="bm-pub">
            <div class="burger-menu-marker"></div>
            <Link to="/publications" class="burger-menu-link">
              Search publications
            </Link>
          </div>
          <div class="burger-menu-item" id="pub-links">
            <div class="burger-menu-marker"></div>
            <Link to="/publications/new" class="burger-menu-link">
              Post new publication
            </Link>
          </div>
          <div class="burger-menu-item" id="pub-links">
            <div class="burger-menu-marker"></div>
            <Link to="/publications/mypublications" class="burger-menu-link">
              My publications
            </Link>
          </div>
        </div>
      </div>

      <div class="bm-section">
        <label for="bm-jobs">
          <div class="comments-title-wrapper">
            <p class="comments-title" id="bm-title">
              Jobs in Research
              <img
                class={`chevron ${showJobs && "rotate-chevron"}`}
                id="jobs-chevron"
                src={chevron}
                attribute="jobs"
              />
            </p>
          </div>
        </label>
        <input
          type="checkbox"
          id="bm-jobs"
          class="bm-checkbox"
          onChange={(e) => setShowJobs(e.target.checked)}
        />
        <div class="bm-section-wrapper">
          <div class="burger-menu-item" id="bm-jobs">
            <div class="burger-menu-marker"></div>
            <Link to="/jobs" class="burger-menu-link">
              Search jobs
            </Link>
          </div>
          {isRecruiter && (
            <div class="burger-menu-item" id="jobs-links">
              <div class="burger-menu-marker"></div>
              <Link to="/jobs/new" class="burger-menu-link">
                Post a job
              </Link>
            </div>
          )}
          {isRecruiter && (
            <div class="burger-menu-item" id="jobs-links">
              <div class="burger-menu-marker"></div>
              <Link to="/jobs/myjobs" class="burger-menu-link">
                My jobs
              </Link>
            </div>
          )}
          {!isRecruiter && (
            <div class="burger-menu-item" id="jobs-links">
              <div class="burger-menu-marker"></div>
              <Link to="/jobs/shortlist" class="burger-menu-link">
                Shortlisted jobs
              </Link>
            </div>
          )}
        </div>
      </div>

      <div class="bm-section">
        <label for="bm-discuss">
          <div class="comments-title-wrapper">
            <p class="comments-title" id="bm-title">
              Discuss
              <img
                class={`chevron ${showDiscuss && "rotate-chevron"}`}
                id="discuss-chevron"
                src={chevron}
                attribute="discuss"
              />
            </p>
          </div>
        </label>
        <input
          type="checkbox"
          id="bm-discuss"
          class="bm-checkbox"
          onChange={(e) => setShowDiscuss(e.target.checked)}
        />
        <div class="bm-section-wrapper">
          <div class="burger-menu-item" id="bm-discuss">
            <div class="burger-menu-marker"></div>
            <Link to="/discuss" class="burger-menu-link">
              Search discussions
            </Link>
          </div>
          <div class="burger-menu-item" id="discuss-links">
            <div class="burger-menu-marker"></div>
            <Link to="discuss/posts/new" class="burger-menu-link">
              Post new discussion
            </Link>
          </div>
          <div class="burger-menu-item" id="discuss-links">
            <div class="burger-menu-marker"></div>
            <Link to="/discuss/mydiscussions" class="burger-menu-link">
              My discussions
            </Link>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <button
          class="create-new-btn"
          id="logout-btn"
          onClick={() => {
            logout();
            navigate("/loggedout", { replace: false });
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

UserMenu.propTypes = {};

export default UserMenu;
