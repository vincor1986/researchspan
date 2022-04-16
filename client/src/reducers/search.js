import {
  SET_LOADING,
  UPDATE_PUB_SEARCH,
  PUB_SEARCH_ERROR,
  ADD_NEXT_PAGE_RESULTS,
  UPDATE_DISCUSS_SEARCH,
  DISCUSS_SEARCH_ERROR,
  UPDATE_JOB_SEARCH,
  JOB_SEARCH_ERROR,
  UPDATE_SEARCH_ITEM,
  DELETE_SEARCH_ITEM,
} from "../actions/types";

const initialState = {
  loading: false,
  pubSearchParams: {},
  pubSearchResults: [],
  pubTotalResults: null,
  pubNextCursor: null,
  jobSearchParams: {},
  jobSearchResults: [],
  jobTotalResults: null,
  discussSearchParams: {},
  discussSearchResults: [],
};

const search = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      let properties = [];

      switch (payload.type) {
        case "publications":
          properties = ["pubSearchParams"];
          break;
        case "discussions":
          properties = ["discussSearchParams"];
          break;
        case "jobs":
          properties = ["jobSearchParams"];
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
    case UPDATE_DISCUSS_SEARCH:
      return {
        ...state,
        discussSearchResults: payload.results,
        loading: false,
      };
    case UPDATE_JOB_SEARCH:
      return {
        ...state,
        jobSearchResults: payload.data,
        pubTotalResults: payload.data.length,
        loading: false,
      };
    case PUB_SEARCH_ERROR:
      return {
        ...state,
        pubSearchResults: [],
        loading: false,
      };
    case JOB_SEARCH_ERROR:
      return {
        ...state,
        jobSearchResults: [],
        loading: false,
      };
    case DISCUSS_SEARCH_ERROR:
      return {
        ...state,
        discussSearchResults: [],
        loading: false,
      };
    case ADD_NEXT_PAGE_RESULTS:
      switch (payload.type) {
        case "publications":
          return {
            ...state,
            pubSearchResults: [
              ...state.pubSearchResults,
              ...payload.response.data.results,
            ],
            pubNextCursor: payload.response.data.nextCursor,

            loading: false,
          };
        case "discussions":
          return {
            ...state,
            discussSearchResults: [...state.discussSearchResults, ...payload],
            loading: false,
          };
        default:
          return state;
      }
    case DELETE_SEARCH_ITEM: {
      const itemType = payload.type;
      const itemId = payload.id;
      const itemIndex = state[`${itemType}SearchResults`]
        .map((obj) => obj._id)
        .indexOf(itemId);

      if (itemIndex === -1) {
        return state;
      } else {
        return {
          ...state,
          [`${itemType}SearchResults`]: state[
            `${itemType}SearchResults`
          ].filter((_, i) => i !== itemIndex),
        };
      }
    }
    case UPDATE_SEARCH_ITEM:
      const format = payload.type;
      const property = `${format}SearchResults`;
      const property2 = `${format}SearchParams`;
      const itemId =
        format === "discuss" ? payload.data.head : payload.data._id;
      const indexOfHead = state[property].map((obj) => obj._id).indexOf(itemId);

      if (indexOfHead === -1) {
        return {
          ...state,
        };
      } else {
        console.log("updating search results");
        return {
          ...state,
          [property]: state[property].filter((obj) => obj._id !== itemId),
          [property2]: {},
        };
      }
    default:
      return state;
  }
};

export default search;
