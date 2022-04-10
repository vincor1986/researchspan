import {
  SET_SEARCH_LOADING,
  UPDATE_PUB_SEARCH,
  PUB_SEARCH_ERROR,
  ADD_NEXT_PAGE_RESULTS,
} from "../actions/types";

const initialState = {
  loading: false,
  pubSearchResults: [],
  pubSearchParams: {},
  jobSearchResults: [],
  discussionSearchResults: [],
  pubNextCursor: null,
  pubTotalResults: null,
};

const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_LOADING:
      let properties = [];

      switch (payload.type) {
        case "publications":
          properties = ["pubSearchParams"];
          break;
        default:
          properties = [];
      }
      return {
        ...state,
        [properties[0]]: payload.params,
        loading: true,
      };
    case UPDATE_PUB_SEARCH:
      return {
        ...state,
        pubSearchResults: payload.data.results,
        pubNextCursor: payload.data.nextCursor,
        pubTotalResults: payload.data.totalResults,
        loading: false,
      };
    case PUB_SEARCH_ERROR:
      return {
        ...state,
        pubSearchResults: [],
        loading: false,
      };
    case ADD_NEXT_PAGE_RESULTS:
      if (payload.type === "publications") {
        return {
          ...state,
          pubSearchResults: [
            ...state.pubSearchResults,
            ...payload.response.data.results,
          ],
          pubNextCursor: payload.response.data.nextCursor,

          loading: false,
        };
      }
    default:
      return state;
  }
};

export default search;
