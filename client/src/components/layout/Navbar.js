import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "./LogoSvg";

const Navbar = () => {
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
      <div className="auth-links">
        <Link to="/login" className="authlink login">
          login
        </Link>
        <Link to="/register" className="authlink register">
          register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
