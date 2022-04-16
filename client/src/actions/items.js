import {
  SET_ITEM_LOADING,
  UPDATE_SEARCH_ITEM,
  ITEM_DELETED,
  ITEM_ERROR,
  DELETE_SEARCH_ITEM,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const updateSearchItem = (payload, type) => (dispatch) => {
  dispatch({
    type: UPDATE_SEARCH_ITEM,
    payload: {
      data: payload,
      type,
    },
  });
};

export const deleteItem = (itemId, itemType) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  let searchType, endpoint;

  switch (itemType) {
    case "job":
      searchType = "job";
      endpoint = `/api/jobs/vacancies/${itemId}`;
      break;
    case "publication":
      searchType = "pub";
      endpoint = `/api/publications/${itemId}`;
      break;
    case "discussion":
      searchType = "discuss";
      endpoint = `/api/discuss/${itemId}/${itemId}`;
      break;
  }

  try {
    const res = await axios.delete(endpoint);

    dispatch({
      type: ITEM_DELETED,
    });

    dispatch({
      type: DELETE_SEARCH_ITEM,
      payload: {
        type: searchType,
        id: itemId,
      },
    });

    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;

      errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
    }

    dispatch({
      type: ITEM_ERROR,
    });
  }
};
