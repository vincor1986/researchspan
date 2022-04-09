import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
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
        <div className="navlink-wrapper active">
          <Link to="/publications/" className="navlink">
            Publications
          </Link>
        </div>
        <div className="navlink-wrapper">
          <Link to="/jobs/" className="navlink">
            Jobs in Research
          </Link>
        </div>
        <div className="navlink-wrapper">
          <Link to="/discuss/" className="navlink">
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
