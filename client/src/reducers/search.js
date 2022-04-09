import {
  SET_SEARCH_LOADING,
  UPDATE_PUB_SEARCH,
  PUB_SEARCH_ERROR,
} from "../actions/types";

const initialState = {
  loading: false,
  pubSearchResults: [],
  pubSearchParams: {},
  jobSearchResults: [],
  discussionSearchResults: [],
};

const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_LOADING:
      return {
        ...state,
        pubSearchParams: payload,
        loading: true,
      };
    case UPDATE_PUB_SEARCH:
      return {
        ...state,
        pubSearchResults: payload.data,
        loading: false,
      };
    case PUB_SEARCH_ERROR:
      return {
        ...state,
        pubSearchResults: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default search;
