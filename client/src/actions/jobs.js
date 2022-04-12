import axios from "axios";
import { setAlert } from "./alert";
import { UPDATE_JOB_SEARCH, SET_LOADING, JOB_SEARCH_ERROR } from "./types";

export const getAllJobs = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      searchParams: {},
      type: "jobs",
    },
  });

  try {
    const res = await axios.get("/api/jobs/");

    dispatch({
      type: UPDATE_JOB_SEARCH,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      const errors = err.response.data.errors;

      errors.forEach((error) => {
        setAlert(error.msg, "warning");
      });

      dispatch({
        type: JOB_SEARCH_ERROR,
      });
    }
  }
};
