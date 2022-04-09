import React, { Fragment } from "react";

const Login = () => {
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
          <form class="auth-form">
            <div class="auth-form-item">
              <p class="auth-label">Email:</p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Password:</p>
              <input type="password" class="auth-form-input" />
            </div>
            <div class="auth-controls-wrapper">
              <button type="submit" class="auth-btn" id="sign-in-btn">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <p class="auth-msg">
          Don't have an account? Sign up for a researcher or recruiter account
          <a href="#">here</a>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
