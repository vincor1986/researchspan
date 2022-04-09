import axios from "axios";
import {
  SET_SEARCH_LOADING,
  PUB_SEARCH_ERROR,
  UPDATE_PUB_SEARCH,
} from "./types";
import { setAlert } from "./alert";

export const setSearchLoading = (searchParams) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_LOADING,
    payload: searchParams,
  });
};

export const pubSearch = (searchParams) => async (dispatch) => {
  dispatch(setSearchLoading(searchParams));

  let { keywords, format, subject_area, field } = searchParams;

  keywords = keywords
    .split(" ")
    .map((el) => el.trim())
    .join(" ");

  let searchString = [keywords, format, subject_area].join(" ");

  if (field && field !== "") {
    searchString += ` ${field}`;
  }

  try {
    const res = await axios.get(`/api/publications/?search=${searchString}`);

    dispatch({
      type: UPDATE_PUB_SEARCH,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "warning"));

        dispatch({
          type: PUB_SEARCH_ERROR,
        });
      }
    }
  }
};
