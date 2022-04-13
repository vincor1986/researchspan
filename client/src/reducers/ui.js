import { CLOSE_MENU, SET_MENU_OPEN } from "../actions/types";

const initialState = {
  menuOpen: false,
};

const ui = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLOSE_MENU:
      return {
        ...state,
        menuOpen: false,
      };
    case SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: true,
      };
    default:
      return state;
  }
};

export default ui;
