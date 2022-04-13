import {
  SET_ITEM_LOADING,
  ITEM_ERROR,
  UPDATE_ITEM,
  UPDATE_DISCUSSION,
  SEND_ERROR,
} from "../actions/types";

import { updateSearchItem } from "../actions/items";

const initialState = {
  discussion: {},
  job: {},
  loading: false,
  item_error: false,
  send_error: false,
  lastActionSuccess: null,
};

const items = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ITEM_LOADING:
      return {
        ...state,
        loading: true,
        lastActionSuccess: false,
      };
    case ITEM_ERROR:
      return {
        ...state,
        item_error: true,
        loading: false,
        lastActionSuccess: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        [payload.type]: payload.item,
        loading: false,
        lastActionSuccess: true,
      };
    case UPDATE_DISCUSSION:
      return {
        ...state,
        discussion: payload,
        loading: false,
        lastActionSuccess: true,
      };
    case SEND_ERROR:
      return {
        ...state,
        send_error: true,
        loading: false,
        lastActionSuccess: false,
      };
    default:
      return state;
  }
};

export default items;
