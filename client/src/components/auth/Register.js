import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    account_type: "researcher",
    organisation: "",
    password: "",
    password2: "",
  });

  const {
    first_name,
    last_name,
    email,
    account_type,
    organisation,
    password,
    password2,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "warning");
    }

    if (account_type === "recruiter") {
    }

    if (account_type === "researcher") {
    }
  };

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
          <form class="auth-form" onSubmit={(e) => onSubmit(e)}>
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
                    name="account_type"
                    onChange={(e) => onChange(e)}
                    value="researcher"
                  />
                </div>
                <div class="auth-type-wrapper">
                  <label class="auth-type-label" for="recruiter-radio-btn">
                    Recruiter:
                  </label>
                  <input
                    type="radio"
                    id="recruiter-radio-btn"
                    name="account_type"
                    onChange={(e) => onChange(e)}
                    value="recruiter"
                  />
                </div>
              </div>
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Given name(s):</p>
              <input
                type="text"
                class="auth-form-input"
                name="first_name"
                onChange={(e) => onChange(e)}
                value={first_name}
              />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Last name:</p>
              <input
                type="text"
                class="auth-form-input"
                name="last_name"
                onChange={(e) => onChange(e)}
                value={last_name}
              />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Organisation:</p>
              <input
                type="text"
                class="auth-form-input"
                name="organisation"
                onChange={(e) => onChange(e)}
                value={organisation}
              />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Email:</p>
              <input
                type="email"
                class="auth-form-input"
                name="email"
                onChange={(e) => onChange(e)}
                value={email}
              />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Password:</p>
              <input
                type="password"
                class="auth-form-input"
                name="password"
                onChange={(e) => onChange(e)}
                value={password}
              />
            </div>
            <div class="auth-form-item">
              <p class="auth-label">Confirm password:</p>
              <input
                type="password"
                class="auth-form-input"
                name="password2"
                onChange={(e) => onChange(e)}
                value={password2}
              />
            </div>
            <div class="auth-controls-wrapper">
              <button type="submit" class="auth-btn" id="sign-in-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        <p class="auth-msg">
          Already have an account? Sign in <Link to="/login">here</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
