import axios from "axios";
import {
  SET_LOADING,
  DISCUSS_SEARCH_ERROR,
  UPDATE_DISCUSS_SEARCH,
  UPDATE_ITEM,
  SET_ITEM_LOADING,
  ITEM_ERROR,
  UPDATE_DISCUSSION,
  SEND_ERROR,
  UPDATE_SEARCH_ITEM,
} from "./types";
import { setAlert } from "./alert";

export const setSearchLoading = (searchParams, type) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      params: searchParams,
      type,
    },
  });
};

export const discussionSearch =
  (searchParams, nextPage = false) =>
  async (dispatch) => {
    dispatch(setSearchLoading(searchParams, "discussions"));

    let { discussion, question, keywords, subject_area, field } = searchParams;

    keywords = keywords
      .split(" ")
      .map((el) => el.trim())
      .join(" ");

    let searchString = [keywords, subject_area]
      .filter((el) => el !== "")
      .join(" ");

    if (field && field !== "") {
      searchString += ` ${field}`;
    }

    try {
      const res = await axios.get(
        `/api/discuss/?search=${searchString}&discussion=${discussion}&question=${question}`
      );

      console.log("data", res.data);

      if (!nextPage) {
        dispatch({
          type: UPDATE_DISCUSS_SEARCH,
          payload: res.data,
        });
      } else {
      }
    } catch (err) {
      if (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => setAlert(error.msg, "warning"));
        }
        dispatch({
          type: DISCUSS_SEARCH_ERROR,
        });
      }
    }
  };

export const getPost = (postId) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  if (!postId) {
    dispatch({
      type: ITEM_ERROR,
    });
    setAlert("Please provide a valid post id", "warning");
  }

  try {
    const res = await axios.get(`/api/discuss/${postId}`);

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        item: res.data,
        type: "discussion",
      },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    errors.forEach((error) => {
      setAlert(error.msg, "warning");
    });

    dispatch({
      type: ITEM_ERROR,
    });
  }
};

export const sendReply =
  ({ main, format }, headId, postId) =>
  async (dispatch) => {
    dispatch({ type: SET_ITEM_LOADING });

    try {
      const params = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ main, format });

      const res = await axios.post(
        `/api/discuss/${headId}/${postId}`,
        body,
        params
      );

      console.log(res.data);

      dispatch({
        type: UPDATE_SEARCH_ITEM,
        payload: {
          data: res.data,
          type: "discuss",
        },
      });

      dispatch({
        type: UPDATE_DISCUSSION,
        payload: res.data,
      });
    } catch (err) {
      if (err) {
        console.log("err", err);

        const errors = err.response.data.errors;

        errors.forEach((error) => {
          setAlert(error.msg, "warning");
        });

        dispatch({
          type: SEND_ERROR,
        });
      }
    }
  };

export const editDiscussion = (formData, postId) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  let { main, context, format, keywords } = formData;

  const kws = keywords.split(",").map((kw) => kw.trim().toLowerCase());

  main = main.trim();
  context = context.trim();

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ main, context, format, kws });

  try {
    const res = await axios.put(`/api/discuss/${postId}`, body, params);

    dispatch({
      type: UPDATE_SEARCH_ITEM,
      payload: {
        data: res.data,
        type: "discuss",
      },
    });

    dispatch({
      type: UPDATE_DISCUSSION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    if (err.response) {
      const errors = err.response.data.errors;

      errors.forEach((error) => setAlert(error.msg, "warning"));
    }

    dispatch({
      type: SEND_ERROR,
    });
  }
};
