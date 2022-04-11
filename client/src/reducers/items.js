import {
  SET_ITEM_LOADING,
  ITEM_ERROR,
  UPDATE_ITEM,
  UPDATE_DISCUSSION,
  SEND_ERROR,
} from "../actions/types";

const initialState = {
  discussion: {},
  job: {},
  loading: false,
  item_error: false,
  send_error: false,
};

const items = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ITEM_ERROR:
      return {
        ...state,
        item_error: true,
        loading: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        [payload.type]: payload.item,
        loading: false,
      };
    case UPDATE_DISCUSSION:
      const postId = payload.head;
      const indexOfHead = state.discussSearchResults
        .map((obj) => obj._id)
        .indexOf(postId);
      const postInState = indexOfHead !== -1;
      return {
        ...state,
        discussSearchResults: postInState
          ? state.discussSearchResults.splice(indexOfHead, 1, payload)
          : [...state.discussSearchResults, payload],
        discussion: payload,
      };
    case SEND_ERROR:
      return {
        ...state,
        send_error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default items;
