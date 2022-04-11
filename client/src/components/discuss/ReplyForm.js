import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendReply } from "../../actions/discussion";

const ReplyForm = ({ headId, postId, type, sendReply, setReplySent }) => {
  const [formMsg, setFormMsg] = useState("");

  const handleInput = (e) => {
    setFormMsg(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setReplySent(true);
    sendReply({ main: formMsg, format: type }, headId, postId);
  };

  return (
    <div class={`main-post-reply-section`}>
      <form class="reply-form" onSubmit={onSubmit}>
        <textarea
          class="reply-input"
          maxLength={1500}
          value={formMsg}
          onChange={(e) => handleInput(e)}
        ></textarea>
        <p class="chars-remaining">
          {1500 - formMsg.length} characters remaining
        </p>
        <button type="submit" class="reply-btn">
          reply
        </button>
      </form>
    </div>
  );
};

ReplyForm.propTypes = {
  sendReply: PropTypes.func.isRequired,
};

export default connect(null, { sendReply })(ReplyForm);
