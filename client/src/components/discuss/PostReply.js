import React from "react";
import PropTypes from "prop-types";

const PostReply = (
  {
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
  },
  reply
) => {
  const consScore =
    Math.round(
      (+consensus_agree / (+consensus_agree + +consensus_disagree)) * 100
    ) || "- ";

  return (
    <div class={`comment ${reply && "reply"}`}>
      <div class="comment-date">{date}</div>
      <div class="comment-user">
        <div class="comment-avatar-wrapper">
          <img class="comment-avatar" src={avatar} alt="avatar" />
        </div>
        <p class="comment-user-name">{`${first_name}${last_name}`}</p>
        {title && (
          <p class="comment-user-desc">{`${title}${
            organisation && `at ${organisation}`
          }`}</p>
        )}
      </div>
      <div class="comment-msg">{main}</div>
      <div class="post-actions-section comment-actions">
        <p class="main-post-reply">reply</p>
        <p class="consensus">
          consensus <span class="consensus-score">{`${consScore}%`}</span>
        </p>
      </div>
      {responses.map((reply, index) => (
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
          reply={true}
        />
      ))}
    </div>
  );
};

PostReply.propTypes = {};

export default PostReply;
