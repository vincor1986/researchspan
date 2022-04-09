import React, { Fragment } from "react";

const Register = () => {
  return (
    <Fragment>
      <div class="main-body-container" id="auth-main-body-container">
        <div class="main-title-wrapper" id="auth-main-title-wrapper">
          <h3 class="main-title">Register new account</h3>
        </div>
        <h4 class="main-title-subheading" id="auth-main-title-subheading">
          Register for the full Research Span experience.
        </h4>
        <div class="auth-container">
          <div class="comments-title-wrapper">
            <p class="comments-title">Register</p>
          </div>
          <form class="auth-form">
            <div class="auth-form-item" id="auth-type-select">
              <p class="auth-label">Type of account:</p>
              <div class="auth-type-select">
                <div class="auth-type-wrapper">
                  <label class="auth-type-label" for="researcher-radio-btn">
                    Researcher:
                  </label>
                  <input
                    type="radio"
                    id="researcher-radio-btn"
                    checked="true"
                    name="account-type"
                  />
                </div>
                <div class="auth-type-wrapper">
                  <label class="auth-type-label" for="recruiter-radio-btn">
                    Recruiter:
                  </label>
                  <input
                    type="radio"
                    id="recruiter-radio-btn"
                    name="account-type"
                  />
                </div>
              </div>
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Given name(s):</p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Last name:</p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Organisation:</p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Email:</p>
              <input type="email" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Password:</p>
              <input type="password" class="auth-form-input" />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Confirm password:</p>
              <input type="password" class="auth-form-input" />
            </div>
            <div class="auth-controls-wrapper">
              <button type="submit" class="auth-btn" id="sign-in-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        <p class="auth-msg">
          Already have an account? Sign in <a href="#">here</a>
        </p>
      </div>
    </Fragment>
  );
};

export default Register;
