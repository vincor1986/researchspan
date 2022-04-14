import axios from "axios";
import { setAlert } from "./alert";
import {
  UPDATE_JOB_SEARCH,
  SET_LOADING,
  JOB_SEARCH_ERROR,
  SET_ITEM_LOADING,
  ITEM_ERROR,
  UPDATE_ITEM,
  UPDATE_SEARCH_ITEM,
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
      type: UPDATE_SEARCH_ITEM,
      payload: {
        data: res.data,
        type: "job",
      },
    });

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        type: "job",
        item: res.data,
      },
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;

      errors.forEach((error) => {
        setAlert(error.msg, "warning");
      });
    }

    dispatch({
      type: ITEM_ERROR,
    });
  }
};

export const editVacancy = (formData, vacancyId) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  if (!vacancyId) {
    dispatch({
      type: ITEM_ERROR,
    });
    setAlert("Please provide a valid vacancy id", "warning");
  }

  let {} = formData;

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  formData.closing_date = Date(formData.closing_date);
  formData.keywords = formData.keywords
    .split(",")
    .map((el) => el.trim().toLowerCase());

  const body = JSON.stringify(formData);

  try {
    const res = await axios.put(
      `/api/jobs/vacancies/${vacancyId}`,
      body,
      params
    );

    dispatch({
      type: UPDATE_SEARCH_ITEM,
      payload: {
        data: res.data,
        type: "job",
      },
    });

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        item: res.data,
        type: "job",
      },
    });
  } catch (err) {
    if (err.response) {
      errors.forEach((error) => {
        setAlert(error.msg, "warning");
      });
    }
    const errors = err.response.data.errors;

    dispatch({
      type: ITEM_ERROR,
    });
  }
};

export const postVacancy = (formData) => async (dispatch) => {
  dispatch({
    type: SET_ITEM_LOADING,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(formData.keywords);
  formData.keywords = formData.keywords
    .map((el) => el.trim().toLowerCase())
    .filter((el) => el !== "");

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`/api/jobs/vacancies`, body, params);

    dispatch({
      type: UPDATE_ITEM,
      payload: {
        item: res.data,
        type: "job",
      },
    });
  } catch (err) {
    if (err.response) {
      errors.forEach((error) => {
        setAlert(error.msg, "warning");
      });
    }
    const errors = err.response.data.errors;

    dispatch({
      type: ITEM_ERROR,
    });
  }
};
