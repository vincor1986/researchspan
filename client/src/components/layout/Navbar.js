import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { setActiveTab } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, loading, user, active_tab },
  logout,
  setActiveTab,
}) => {
  const setTabActive = (e) => {
    console.log(e.target.id);
    setActiveTab(e.target.id);
  };

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
      <p className="authlink login" onClick={() => logout()}>
        logout
      </p>
    </div>
  );

  return (
    <nav className="nav">
      <Link to="/" className="title-logo">
        <LogoSvg className="logo" />
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
          className={`navlink-wrapper ${active_tab === "discuss" && "active"}`}
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
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, setActiveTab })(Navbar);
