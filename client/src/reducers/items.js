import { SET_ITEM_LOADING, ITEM_ERROR, UPDATE_ITEM } from "../actions/types";

const initialState = {
  discussion: {},
  job: {},
  loading: false,
  item_error: false,
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
    default:
      return state;
  }
};

export default items;
