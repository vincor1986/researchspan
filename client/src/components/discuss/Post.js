import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostReply from "./PostReply";
import { connect } from "react-redux";
import ReplyForm from "./ReplyForm";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";
import { toggleConsensus } from "../../actions/discussion";

const Post = ({
  post: {
    _id,
    user,
    first_name,
    last_name,
    title,
    avatar,
    format,
    keywords,
    main,
    context,
    edited,
    responses,
    head,
    consensus_agree,
    consensus_disagree,
    recommended,
    date,
    last_edited,
    organisation,
  },
  toggleConsensus,
  authUserPost,
  items: { send_error, loading },
  auth,
}) => {
  const consScore =
    Math.round(
      (consensus_agree.length /
        (consensus_agree.length + consensus_disagree.length)) *
        100
    ) || "- ";

  const [replySent, setReplySent] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const navigate = useNavigate();

  const userAgrees = consensus_agree.includes(auth.user._id);
  const userDisagrees = consensus_disagree.includes(auth.user._id);

  const toggleConsensusList = (res) => {
    if (
      (userAgrees && res === "disagree") ||
      (userDisagrees && res === "agree")
    ) {
      return;
    }
    toggleConsensus(head, _id, res);
  };

  useEffect(() => {
    if (replySent) {
      if (!send_error && !loading) {
        setShowReplyForm(false);
        setReplySent(false);
      } else if (send_error) {
        setReplySent(false);
      }
    }
  }, [send_error, loading, replySent]);

  return (
    <div className="main-body-container">
      {" "}
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
              <a href="#" class="user-view-profile-link">
                view profile
              </a>
            </h2>

            <p class="user-organisation">{organisation}</p>
          </div>
        </div>
        {authUserPost && (
          <div class="user-controls-wrapper">
            <button class="create-new-btn" id="create-new-btn">
              New post
            </button>
            <button
              class="edit-btn discuss-edit-btn"
              onClick={() =>
                navigate(`/discuss/post/${_id}/edit`, { replace: true })
              }
            >
              Edit post
            </button>
            <button class="delete-btn discuss-delete-btn">Delete post</button>
          </div>
        )}
      </div>
      <div class="main-content">
        <div class="date-posted-msg">
          <p class="date-posted-label">Posted:</p>
          <p class="date-posted">
            {moment(date).format("Do MMMM YYYY - HH:MM a")}
          </p>
          <p class="discussion-tag tag" style={{ marginRight: "1rem" }}>
            {format && `${format[0].toUpperCase()}${format.substring(1)}`}
          </p>
          {edited && <p class="edited tag">Edited</p>}
        </div>
        <div class="main-msg-container">
          <p class="main-msg">{main}</p>
        </div>

        <div class="context-msg-wrapper">
          <p class="context-label">Context:</p>
          {context.split("\n").map((para) => (
            <Fragment>
              <p class="context">{para}</p>
              <br />
            </Fragment>
          ))}
        </div>
        <div class="post-actions-section">
          <p
            class="main-post-reply"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            reply
          </p>
          <p class="consensus">
            consensus <span class="consensus-score">{`${consScore}%`}</span>
          </p>
          <button
            class={`agree consensus-btn ${
              userAgrees && "consensus-btn-selected"
            }`}
            onClick={() => toggleConsensusList("agree")}
          >
            ✓
          </button>
          <button
            class={`disagree consensus-btn ${
              userDisagrees && "consensus-btn-selected"
            }`}
            onClick={() => toggleConsensusList("disagree")}
          >
            ✘
          </button>
        </div>
        {showReplyForm && auth.isAuthenticated && (
          <ReplyForm
            headId={head}
            postId={head}
            type={format === "question" ? "answer" : "comment"}
            showReplyForm={showReplyForm}
            setReplySent={setReplySent}
          />
        )}
        {showReplyForm && !auth.isAuthenticated && (
          <div className="login-msg">Please log in to reply</div>
        )}
      </div>
      <section class="comments-section">
        <div class="comments-title-wrapper">
          <p class="comments-title">Comments</p>
        </div>
        <div class="comments-wrapper">
          <div class="sort-wrapper comments-sort">
            <p class="sort-msg">Sort by:</p>
            <select class="sort-selector">
              <option class="sort-option" value="date">
                newest
              </option>
              <option class="sort-option" value="consensus">
                consensus
              </option>
            </select>
          </div>
          {[...responses]
            .reverse()
            .filter((el) => el !== null)
            .map((reply, index) => (
              <PostReply
                key={index}
                postReply={reply}
                headId={head}
                reply={false}
                setReplySent={setReplySent}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

Post.propTypes = {
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleConsensus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { toggleConsensus })(Post);
