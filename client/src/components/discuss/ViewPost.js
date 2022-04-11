import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/discussion";
import ResultsLoading from "../layout/ResultsLoading";

const ViewPost = ({
  search: { discussSearchResults },
  items: { discussion, item_error },
  auth,
  getPost,
}) => {
  const { postId } = useParams();

  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const postInState = discussSearchResults.find((obj) => obj._id === postId);

  useEffect(() => {
    if (!postInState) {
      getPost(postId);
    } else {
      setPost(postInState);
      console.log("post set from state");
    }
  }, [postInState, postId, getPost, setPost]);

  useEffect(() => {
    if (Object.keys(discussion).length > 0 && !postInState) {
      setPost(discussion);
      console.log("post set from fetch");
    }
  }, [discussion, setPost, postInState]);

  useEffect(() => {
    if (post || item_error) {
      setLoading(false);
    }
  }, [post, item_error]);

  const authUserPost =
    auth.user && post && post.user.toString() === auth.user._id.toString();

  return loading ? (
    <ResultsLoading firstLoad={true} />
  ) : post ? (
    <Post post={post} authUserPost={authUserPost} />
  ) : (
    <h4>No post here</h4>
  );
};

ViewPost.propTypes = {
  search: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(ViewPost);
