import axios from "axios";
import { setAlert } from "./alert";
import {
  UPDATE_JOB_SEARCH,
  SET_LOADING,
  JOB_SEARCH_ERROR,
  SET_ITEM_LOADING,
  ITEM_ERROR,
  UPDATE_ITEM,
} from "./types";

export const getAllJobs = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      params: {},
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

export const getVacancy = (vacancyId) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  if (!vacancyId) {
    dispatch({
      type: ITEM_ERROR,
    });
    setAlert("Please provide a valid vacancy id", "warning");
  }

  try {
    const res = await axios.get(`/api/jobs/vacancies/${vacancyId}`);

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        item: res.data,
        type: "job",
      },
    });
  } catch (err) {
    const errors = err.response.data.errors;

    errors.forEach((error) => {
      setAlert(error.msg, "warning");
    });

    dispatch({
      type: ITEM_ERROR,
    });
  }
};
