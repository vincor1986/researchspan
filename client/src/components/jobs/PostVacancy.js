import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postVacancy } from "../../actions/jobs";

const PostVacancy = ({
  items: { loading, lastActionSuccess, job },
  user: { account_type, organisation },
  postVacancy,
  uploadLogo,
}) => {
  const [formData, setFormData] = useState({
    location: "",
    ref: "",
    salary: "",
    logo: "",
    salary_period: "",
    salary_currency: "",
    fixed_term_length: "",
    organisation,
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    closing_date: "",
    jd: "",
    title: "",
    fixed_term_length: "",
    attachment_links: [],
    keywords: "",
    apply_link: "",
  });
  const navigate = useNavigate();

  if (account_type !== "recruiter") {
    navigate("/jobs", { replace: true });
  }

  const [sentData, setSentData] = useState(false);
  const [logoState, setLogoState] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setLogoState(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const setAttachmentLinks = (index, property, e) => {
    setFormData((prev) => {
      let copy = [...prev.attachment_links];
      let obj = copy[index] || { form: "", link: "" };
      obj[property] = e.target.value;
      copy.length >= index + 1 ? copy.splice(index, 1, obj) : copy.push(obj);
      return { ...prev, attachment_links: copy };
    });
  };

  const addAttachment = () => {
    setFormData((prev) => {
      let copy = [...prev.attachment_links];
      copy.push({ form: "", link: "" });
      return { ...prev, attachment_links: copy };
    });
  };

  const removeAttachment = (index) => {
    setFormData((prev) => {
      let copy = [...prev.attachment_links];
      copy.splice(index, 1);
      return { ...prev, attachment_links: copy };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logoState !== "" && setFormData({ ...formData, logo: logoState });
    postVacancy(formData);
    setSentData(true);
  };

  useEffect(() => {
    if (sentData && !loading && lastActionSuccess && job._id) {
      navigate(`/jobs/${job._id}`, { replace: false });
    }
  }, [loading]);

  const attachmentJSX = (index) => (
    <div class="detail-summary-wrapper">
      <p class="detail-summary-label">Attachment type:</p>
      <input
        type="text"
        class="detail-summary edit job-detail-edit"
        value={formData.attachment_links[index].form}
        onChange={(e) => setAttachmentLinks(index, "form", e)}
      ></input>
      <p class="detail-summary-label">Attachment link:</p>
      <input
        type="text"
        class="detail-summary edit job-detail-edit"
        value={formData.attachment_links[index].link}
        onChange={(e) => setAttachmentLinks(index, "link", e)}
      ></input>
      <button
        className="cancel-btn remove-attachment-btn"
        onClick={() => removeAttachment(index)}
        type="button"
      >
        Remove
      </button>
    </div>
  );

  const attachmentSection = Array.from(
    { length: formData.attachment_links.length },
    (_, index) => attachmentJSX(index)
  );

  return (
    <div class="main-body-container">
      <div class="main-title-wrapper">
        <h3 class="main-title">Post a new vacancy</h3>
      </div>
      <h4 class="main-title-subheading">
        List your vacancy for free, to reach researchers around the world
        looking for great opportunities like yours.
      </h4>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="main-content">
          <h4 class="keywords-label">Job title</h4>
          <div class="job-title-wrapper">
            <input
              class="job-title edit job-title-edit"
              value={formData.title}
              name="title"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <br />
          <br />
          <div class="keywords-editor-wrapper">
            <h4 class="keywords-label">
              Keywords <span class="keywords-note">comma-seperated</span>
            </h4>
            <textarea
              class="edit-keywords"
              name="keywords"
              value={formData.keywords}
              maxlength={120}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div class="job-detail-container">
            <div class="vacancy-details-summary-container">
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Organisation:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  name="organisation"
                  value={formData.organisation}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Location:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  name="location"
                  value={formData.location}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Logo:</p>
                <input
                  type="file"
                  class="detail-summary edit job-detail-edit file-input"
                  name="logo"
                  onChange={(e) =>
                    e.target.value === ""
                      ? setLogoState("")
                      : handleFileUpload(e)
                  }
                ></input>
                {logoState && (
                  <div className="logo-preview-wrapper">
                    <br />
                    <p className="preview-msg">Preview:</p>
                    <img
                      src={logoState}
                      alt="logo-to-upload"
                      className="logo-preview"
                    />{" "}
                  </div>
                )}
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Reference:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  value={formData.ref}
                  name="ref"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Salary amount:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  value={formData.salary}
                  name="salary"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Salary frequency:</p>
                <select
                  class="detail-summary edit job-detail-edit"
                  value={formData.salary_period}
                  name="salary_period"
                  onChange={(e) => onChange(e)}
                >
                  <option value="" selected={formData.salary_period === ""}>
                    Please select...
                  </option>
                  <option
                    value="per hour"
                    selected={formData.salary_period === "per hour"}
                  >
                    per hour
                  </option>
                  <option
                    value="per annum"
                    name="salary_period"
                    selected={formData.salary_period === "per annum"}
                  >
                    per annum
                  </option>
                  <option
                    value="fixed term"
                    name="salary_period"
                    selected={formData.salary_period === "fixed term"}
                  >
                    fixed-term
                  </option>
                </select>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Fixed-term length:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  name="fixed_term_length"
                  value={formData.fixed_term_length || ""}
                  onChange={(e) => onChange(e)}
                  disabled={formData.salary_period !== "fixed term"}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Salary currency:</p>
                <select
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  value={formData.salary_currency}
                  name="salary_currency"
                  onChange={(e) => onChange(e)}
                >
                  <option value="">Please select...</option>
                  <option value="£">£</option>
                  <option value="$">$</option>
                  <option value="€">€</option>
                </select>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact name:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  value={formData.contact_name}
                  name="contact_name"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact phone:</p>
                <input
                  type="number"
                  class="detail-summary edit job-detail-edit"
                  value={formData.contact_phone}
                  name="contact_phone"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Contact email:</p>
                <input
                  type="email"
                  class="detail-summary edit job-detail-edit"
                  value={formData.contact_email}
                  name="contact_email"
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Closing date:</p>
                <input
                  type="date"
                  class="detail-summary edit job-detail-edit"
                  value={formData.closing_date}
                  name="closing_date"
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
              <div class="detail-summary-wrapper">
                <p class="detail-summary-label">Apply link:</p>
                <input
                  type="text"
                  class="detail-summary edit job-detail-edit"
                  value={formData.apply_link}
                  name="apply_link"
                  onChange={(e) => onChange(e)}
                ></input>
              </div>
            </div>
            <div class="job-desc-container edit-job-desc-section">
              <div class="comments-title-wrapper">
                <p class="comments-title">Job description</p>
              </div>
              <div class="full-content-wrapper edit-content-wrapper">
                <textarea
                  class="text-content edit edit-text-content"
                  value={formData.jd}
                  name="jd"
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
            </div>
          </div>
          {formData.attachment_links.length > 0 && (
            <div class="vacancy-details-summary-container">
              {[...attachmentSection].map((el) => el)}
            </div>
          )}
          <button
            className="apply-btn add-attachment-btn"
            onClick={addAttachment}
            type="button"
          >
            Add Attachment
          </button>
        </div>
        <div class="post-actions-section">
          <button class="save-changes-btn" type="submit">
            Post vacancy
          </button>
          <button
            class="save-changes-btn cancel-btn"
            onClick={() => navigate(`/jobs`, { replace: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

PostVacancy.propTypes = {
  items: PropTypes.object.isRequired,
  postVacancy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  user: state.auth.user,
});

export default connect(mapStateToProps, { postVacancy })(PostVacancy);
