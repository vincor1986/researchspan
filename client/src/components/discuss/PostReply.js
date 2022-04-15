import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReplyForm from "./ReplyForm";
import { connect } from "react-redux";
import {
  deleteDiscussionItem,
  toggleConsensus,
} from "../../actions/discussion";

const PostReply = ({
  postReply: {
    user,
    date,
    position,
    avatar,
    first_name,
    last_name,
    main,
    responses,
    consensus_agree,
    consensus_disagree,
    organisation,
    _id,
  },
  reply,
  setReplySent,
  headId,
  auth,
  deleteDiscussionItem,
  toggleConsensus,
}) => {
  const consScore =
    Math.round(
      (consensus_agree.length /
        (consensus_agree.length + consensus_disagree.length)) *
        100
    ) || "- ";

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteReply, setShowDeleteReply] = useState(false);
  const [showConsensusControls, setShowConsensusControls] = useState(false);

  const deleteReply = () => {
    deleteDiscussionItem(headId, _id);
  };

  const isAuthUserReply = auth.user._id === user.toString();

  const userAgrees = consensus_agree.includes(auth.user._id);
  const userDisagrees = consensus_disagree.includes(auth.user._id);

  const toggleConsensusList = (res) => {
    if (
      (userAgrees && res === "disagree") ||
      (userDisagrees && res === "agree")
    ) {
      return;
    }
    toggleConsensus(headId, _id, res);
  };

  useEffect(() => {
    setShowReplyForm(false);
  }, [responses]);

  return (
    <div class={`comment ${reply && "reply"}`}>
      <div class="comment-date">{date}</div>
      <div class="comment-user">
        <div class="comment-avatar-wrapper">
          <img class="comment-avatar" src={avatar} alt="avatar" />
        </div>
        <p class="comment-user-name">{`${first_name} ${last_name}`}</p>
        {organisation && (
          <p class="comment-user-desc">{`${
            position && `${position} at `
          }${organisation}`}</p>
        )}
      </div>
      {main.split("\n").map((content) => (
        <Fragment>
          <div class="comment-msg">{content}</div>
        </Fragment>
      ))}
      <div class="post-actions-section comment-actions">
        <div className="comments-post-actions-wrapper">
          <p
            class="main-post-reply"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            reply
          </p>
          <p
            class="consensus"
            onClick={() => setShowConsensusControls(!showConsensusControls)}
            style={{ cursor: "pointer" }}
          >
            consensus <span class="consensus-score">{`${consScore}%`}</span>
          </p>

          {showConsensusControls && (
            <Fragment>
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
            </Fragment>
          )}
          {isAuthUserReply && (
            <p
              className="delete-reply-msg"
              onClick={() => setShowDeleteReply(true)}
            >
              delete reply
            </p>
          )}
          {showDeleteReply && (
            <div className="delete-reply-wrapper">
              <button
                className="delete-reply-btn cancel-delete"
                onClick={() => setShowDeleteReply(false)}
              >
                cancel
              </button>
              <button
                className="delete-reply-btn delete-reply"
                onClick={() => deleteReply()}
              >
                delete
              </button>
            </div>
          )}
        </div>
        {showReplyForm && auth.isAuthenticated && (
          <ReplyForm
            headId={headId}
            postId={_id}
            type={"comment"}
            showReplyForm={showReplyForm}
            setReplySent={setReplySent}
            toggleConsensusList={toggleConsensusList}
          />
        )}
        {showReplyForm && !auth.isAuthenticated && (
          <div className="login-msg">Please log in to reply</div>
        )}
      </div>
      {[...responses]
        .reverse()
        .filter((el) => el !== null)
        .map((replyItem, index) => (
          <PostReply
            key={index}
            postReply={replyItem}
            headId={headId}
            reply={true}
            setReplySent={setReplySent}
            auth={auth}
            deleteDiscussionItem={deleteDiscussionItem}
          />
        ))}
    </div>
  );
};

PostReply.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteDiscussionItem: PropTypes.func.isRequired,
  toggleConsensus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteDiscussionItem,
  toggleConsensus,
})(PostReply);
