import axios from "axios";
import {
  SET_SEARCH_LOADING,
  PUB_SEARCH_ERROR,
  UPDATE_PUB_SEARCH,
  ADD_NEXT_PAGE_RESULTS,
  PREVIOUS_SEARCH_PAGE,
} from "./types";
import { setAlert } from "./alert";

export const setSearchLoading = (searchParams, type) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_LOADING,
    payload: {
      params: searchParams,
      type,
    },
  });
};

export const pubSearch =
  (searchParams, nextCursor = "*") =>
  async (dispatch) => {
    dispatch(setSearchLoading(searchParams, "publications"));

    let { keywords, format, subject_area, field } = searchParams;

    console.log(searchParams, nextCursor);

    keywords = keywords
      .split(" ")
      .map((el) => el.trim())
      .join(" ");

    let searchString = [keywords, format, subject_area]
      .filter((el) => el !== "")
      .join(" ");

    if (field && field !== "") {
      searchString += ` ${field}`;
    }

    try {
      const res = await axios.get(
        `/api/publications/?search=${searchString}&cursor=${nextCursor}`
      );

      console.log("data", res.data);

      if (nextCursor === "*") {
        dispatch({
          type: UPDATE_PUB_SEARCH,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_NEXT_PAGE_RESULTS,
          payload: {
            response: res.data,
            type: "publications",
          },
        });
      }
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
