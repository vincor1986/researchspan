import {
  SET_COLLECTION_LOADING,
  UPDATE_COLLECTION,
  COLLECTION_ERROR,
} from "../actions/types";

const initialState = {
  loading: false,
  jobs: [],
  discussions: [],
  publications: [],
  lastActionSuccess: null,
};

const collection = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_COLLECTION_LOADING:
      return {
        ...state,
        [payload.type]: [],
        lastActionSuccess: null,
        loading: true,
      };
    case UPDATE_COLLECTION:
      return {
        ...state,
        [payload.type]: payload.data,
        lastActionSuccess: true,
        loading: false,
      };
    case COLLECTION_ERROR:
      return {
        ...state,
        lastActionSuccess: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default collection;
