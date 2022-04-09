import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <div class="main-body-container" id="auth-main-body-container">
        <div class="main-title-wrapper" id="auth-main-title-wrapper">
          <h3 class="main-title">Sign In</h3>
        </div>
        <h4 class="main-title-subheading" id="auth-main-title-subheading">
          Sign in for the full Research Span experience.
        </h4>
        <div class="auth-container">
          <div class="comments-title-wrapper">
            <p class="comments-title">Sign In</p>
          </div>
          <form class="auth-form" onSubmit={(e) => onSubmit(e)}>
            <div class="auth-form-item">
              <p
                class="auth-label"
                name={email}
                value={email}
                onChange={(e) => onChange(e)}
              >
                Email:
              </p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Password:</p>
              <input
                type="password"
                class="auth-form-input"
                name={password}
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div class="auth-controls-wrapper">
              <button type="submit" class="auth-btn" id="sign-in-btn">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <p class="auth-msg">
          Don't have an account? Sign up for a researcher or recruiter account{" "}
          <Link to="/register">here</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
