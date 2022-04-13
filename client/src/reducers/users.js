import { SET_USERS, LOADING_USERS } from "../actions/types";

const initialState = {
  loading: false,
  userArray: [],
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
    default:
      return state;
  }
};

export default users;
