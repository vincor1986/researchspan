import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import UserMenu from "./UserMenu";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { setActiveTab } from "../../actions/auth";
import { setMenuOpen, closeMenu } from "../../actions/ui";

const Navbar = ({
  auth: { isAuthenticated, loading, user, active_tab },
  logout,
  setActiveTab,
  ui: { menuOpen },
  setMenuOpen,
  closeMenu,
}) => {
  const setTabActive = (e) => {
    console.log(e.target.id);
    setActiveTab(e.target.id);
  };

  const [newNotifications, setNewNotifications] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const openMenu = () => {
    setShowUserMenu(true);
    setMenuOpen();
  };

  const menuClose = () => {
    setShowUserMenu(false);
    closeMenu();
  };

  useEffect(() => {
    if (isAuthenticated && Object.keys(user).length > 0) {
      setAvatar(user.avatar);
      setNotifications(user.notifications);
    }

    if (
      isAuthenticated &&
      Object.keys(user).length > 0 &&
      user.notifications.filter((obj) => obj.unread).length > 0
    ) {
      setNewNotifications(true);
    } else {
      setNewNotifications(false);
    }
  }, [user, notifications, isAuthenticated]);

  const guestLinks = (
    <div className="auth-links">
      <Link to="/login" className="authlink login">
        login
      </Link>
      <Link to="/register" className="authlink register">
        register
      </Link>
    </div>
  );

  const authLinks = (
    <div className="auth-links">
      <div class="navbar-avatar-wrapper">
        <div
          class="avatar-wrapper"
          id="navbar-avatar"
          onClick={() => (showUserMenu ? menuClose() : openMenu())}
        >
          <img src={avatar} alt="avatar" class="avatar noselect" id="navatar" />
        </div>
        <div class="new-notifications"></div>
      </div>
    </div>
  );

  return (
    !loading && (
      <Fragment>
        {showUserMenu && <div class="burger-modal" onClick={menuClose}></div>}
        <nav className="nav">
          <Link
            to="/"
            className="title-logo"
            onClick={() => setActiveTab(null)}
          >
            <LogoSvg className="logo" onClick={() => setActiveTab(null)} />
          </Link>
          <div className="nav-links">
            <div
              className={`navlink-wrapper ${
                active_tab === "publications" && "active"
              }`}
              id="publications"
              onClick={(e) => setTabActive(e)}
            >
              <Link
                to="/publications/"
                className="navlink"
                id="publications"
                onClick={(e) => setTabActive(e)}
              >
                Publications
              </Link>
            </div>
            <div
              className={`navlink-wrapper ${active_tab === "jobs" && "active"}`}
              id="jobs"
              onClick={(e) => setTabActive(e)}
            >
              <Link
                to="/jobs/"
                className="navlink"
                id="jobs"
                onClick={(e) => setTabActive(e)}
              >
                Jobs in Research
              </Link>
            </div>
            <div
              className={`navlink-wrapper ${
                active_tab === "discuss" && "active"
              }`}
              id="discuss"
              onClick={(e) => setTabActive(e)}
            >
              <Link
                to="/discuss/"
                className="navlink"
                id="discuss"
                onClick={(e) => setTabActive(e)}
              >
                Discuss
              </Link>
            </div>
          </div>
          {!loading ? (isAuthenticated ? authLinks : guestLinks) : ""}
          <div class="user-menu-container"></div>
          {!loading && showUserMenu && (
            <UserMenu
              isAuthenticated={isAuthenticated}
              setShowUserMenu={setShowUserMenu}
              logout={logout}
              user={user}
            />
          )}
        </nav>
      </Fragment>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  ui: state.ui,
});

export default connect(mapStateToProps, {
  logout,
  setActiveTab,
  setMenuOpen,
  closeMenu,
})(Navbar);
