import { UPDATE_SEARCH_ITEM } from "./types";

export const updateSearchItem = (payload, type) => (dispatch) => {
  dispatch({
    type: UPDATE_SEARCH_ITEM,
    payload: {
      data: payload,
      type,
    },
  });
};
