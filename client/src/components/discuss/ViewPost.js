import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../actions/discussion";
import ResultsLoading from "../layout/ResultsLoading";

const ViewPost = ({
  search: { discussSearchResults },
  items: { discussion, loading, item_error },
  auth,
  getPost,
}) => {
  const params = useParams();

  const [post, setPost] = useState(
    discussSearchResults.filter((obj) => obj._id === params.id.toString())[0]
  );

  let _id,
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
    organisation;

  useEffect(() => {
    if (post === undefined || !post) {
      getPost(params.id);
    }

    if (discussion) {
      setPost(discussion);
    }
  }, [discussion]);

  const authUserPost =
    auth.user && post.user.toString() === auth.user._id.toString();

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
