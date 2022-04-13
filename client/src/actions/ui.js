import { CLOSE_MENU, SET_MENU_OPEN } from "./types";

export const closeMenu = () => (dispatch) => {
  dispatch({
    type: CLOSE_MENU,
  });
};

export const setMenuOpen = () => (dispatch) => {
  dispatch({
    type: SET_MENU_OPEN,
  });
};
