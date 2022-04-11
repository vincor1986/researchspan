import React, { Fragment } from "react";
import PropTypes from "prop-types";
import PostReply from "./PostReply";

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
  authUserPost,
}) => {
  const consScore =
    Math.round(
      (+consensus_agree / (+consensus_agree + +consensus_disagree)) * 100
    ) || "- ";

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
            <button class="edit-btn discuss-edit-btn">Edit post</button>
            <button class="delete-btn discuss-delete-btn">Delete post</button>
          </div>
        )}
      </div>
      <div class="main-content">
        <div class="date-posted-msg">
          <p class="date-posted-label">Posted on:</p>
          <p class="date-posted">{date}</p>
          <p class="discussion-tag tag">
            {format && `${format[0].toUpperCase()}${format.substring(1)}`}
          </p>
          {edited && <p class="edited tag">Edited</p>}
        </div>
        <div class="main-msg-container">
          <p class="main-msg">{main}</p>
        </div>

        <div class="context-msg-wrapper">
          <p class="context-label">Context:</p>
          <p class="context">{context}</p>
        </div>
        <div class="post-actions-section">
          <p class="main-post-reply">reply</p>
          <p class="consensus">
            consensus <span class="consensus-score">{`${consScore}%`}</span>
          </p>
          <button class="agree consensus-btn">✓</button>
          <button class="disagree consensus-btn">✘</button>
        </div>
        <div class="main-post-reply-section">
          <form class="reply-form">
            <textarea class="reply-input"></textarea>
            <p class="chars-remaining">750 characters remaining</p>
            <button type="submit" class="reply-btn">
              reply
            </button>
          </form>
        </div>
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
                date
              </option>
              <option class="sort-option" value="consensus">
                consensus
              </option>
            </select>
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
              reply={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

Post.propTypes = {};

export default Post;
