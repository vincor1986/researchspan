import {
  SET_USERS,
  LOADING_USERS,
  UPDATE_USER_SEARCH,
  USERS_ERROR,
} from "../actions/types";

const initialState = {
  loading: false,
  userArray: [],
  userSearch: [],
};

const users = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true,
      };
    case SET_USERS:
      return {
        ...state,
        userArray: [...state.userArray, ...payload],
        loading: false,
      };
    case UPDATE_USER_SEARCH:
      return {
        ...state,
        userSearch: payload,
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default users;
