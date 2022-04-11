import React, { useState } from "react";
import PropTypes from "prop-types";
import ReplyForm from "./ReplyForm";
import { connect } from "react-redux";

const PostReply = ({
  date,
  title,
  avatar,
  first_name,
  last_name,
  main,
  responses,
  consensus_agree,
  consensus_disagree,
  organisation,
  headId,
  postId,
  reply,
  setReplySent,
  isAuthenticated,
}) => {
  const consScore =
    Math.round(
      (+consensus_agree / (+consensus_agree + +consensus_disagree)) * 100
    ) || "- ";

  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div class={`comment ${reply && "reply"}`}>
      <div class="comment-date">{date}</div>
      <div class="comment-user">
        <div class="comment-avatar-wrapper">
          <img class="comment-avatar" src={avatar} alt="avatar" />
        </div>
        <p class="comment-user-name">{`${first_name} ${last_name}`}</p>
        {title && (
          <p class="comment-user-desc">{`${title}${
            organisation && `at ${organisation}`
          }`}</p>
        )}
      </div>
      <div class="comment-msg">{main}</div>
      <div class="post-actions-section comment-actions">
        <div className="comments-post-actions-wrapper">
          <p
            class="main-post-reply"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            reply
          </p>
          <p class="consensus">
            consensus <span class="consensus-score">{`${consScore}%`}</span>
          </p>
        </div>
        {showReplyForm && isAuthenticated && (
          <ReplyForm
            headId={headId}
            postId={postId}
            type={"comment"}
            showReplyForm={showReplyForm}
            setReplySent={setReplySent}
          />
        )}
        {showReplyForm && !isAuthenticated && (
          <div className="login-msg">Please log in to reply</div>
        )}
      </div>
      {[...responses].reverse().map((reply, index) => (
        <PostReply
          key={index}
          date={reply.date}
          title={reply.title}
          avatar={reply.avatar}
          first_name={reply.first_name}
          last_name={reply.last_name}
          main={reply.main}
          responses={reply.responses}
          consensus_agree={reply.consensus_agree}
          consensus_disagree={reply.consensus_disagree}
          organisation={reply.organisation}
          headId={headId}
          postId={reply._id}
          reply={true}
          setReplySent={setReplySent}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

PostReply.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PostReply);
