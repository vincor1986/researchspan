import { SET_USERS, LOADING_USERS } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getUsers = (idArray) => async (dispatch) => {
  dispatch({
    type: LOADING_USERS,
  });

  try {
    let userArray = [];

    for (let i = 0; i < idArray.length; i++) {
      const userId = idArray[i];

      const res = await axios.get(`/api/users/${userId}`);
      userArray.push(res.data);
    }

    dispatch({
      type: SET_USERS,
      payload: userArray,
    });
  } catch (err) {
    let errors;

    if (err) {
      if (err.response) {
        errors = err.response.data.errors;

        errors.forEach((error) => {
          setAlert(error.msg, "warning");
        });
      }
    }
  }
};
