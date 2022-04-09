import React from "react";
import LogoSvg from "./LogoSvg";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="title-logo">
        <LogoSvg className="logo" />
      </div>
      <div className="nav-links">
        <div className="navlink-wrapper active">
          <a href="#" className="navlink">
            Publications
          </a>
        </div>
        <div className="navlink-wrapper">
          <a href="#" className="navlink">
            Jobs in Research
          </a>
        </div>
        <div className="navlink-wrapper">
          <a href="#" className="navlink">
            Discuss
          </a>
        </div>
      </div>
      <div className="auth-links">
        <a href="#" className="authlink login">
          login
        </a>
        <a href="#" className="authlink register">
          register
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
