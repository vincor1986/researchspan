import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewDiscussionForm from "./NewDiscussionForm";

const PostNewDiscussion = ({
  user: { avatar, first_name, last_name, organisation },
}) => {
  return (
    <div className="main-body-container">
      {" "}
      <div class="main-title-wrapper">
        <h3 class="main-title">Create a discussion post</h3>
      </div>
      <h4 class="main-title-subheading">
        Talk about the latest findings, ask questions, share your thoughts and
        broaden your understanding of key concepts and theories.
      </h4>
      <div class="user-detail-section">
        <div class="user-detail-wrapper">
          <div class="user-avatar-section">
            <div class="user-avatar-wrapper">
              <img src={avatar} alt="avatar" class="avatar" />
            </div>
          </div>
          <div class="user-info-section">
            <h2 class="user-info-name">
              {`${first_name} ${last_name}`}
              {/* <a href="#" class="user-view-profile-link">
                view profile
              </a> */}
            </h2>
            <p class="user-organisation">{organisation}</p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "6rem", marginLeft: "7rem" }}>
        <NewDiscussionForm />
      </div>
    </div>
  );
};

PostNewDiscussion.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PostNewDiscussion);
