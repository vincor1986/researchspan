import axios from "axios";
import { setAlert } from "./alert";
import {
  SET_COLLECTION_LOADING,
  UPDATE_COLLECTION,
  COLLECTION_ERROR,
} from "./types";

export const getCollection =
  (collectionIds, collectionType) => async (dispatch) => {
    console.log("running get collection");

    dispatch({
      type: SET_COLLECTION_LOADING,
      payload: {
        type: collectionType,
      },
    });

    console.log(collectionIds);

    let endpoint;

    switch (collectionType) {
      case "publications":
        endpoint = "/api/publications/";
        break;
      case "jobs":
        endpoint = "/api/jobs/vacancies/";
        break;
      case "discussions":
        endpoint = "/api/discuss/";
        break;
    }

    let collection = [];

    try {
      for (let i = 0; i < collectionIds.length; i++) {
        const id = collectionIds[i];
        const url = endpoint + id.toString();

        console.log(url);

        const res = await axios.get(url).catch((err) => {
          if (err) {
            const errors = err.response.data.errors;

            errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
          }
        });

        collection.push(res.data);
      }

      dispatch({
        type: UPDATE_COLLECTION,
        payload: {
          data: collection,
          type: collectionType,
        },
      });
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.errors;

        errors.forEach((error) => dispatch(setAlert(error.msg, "warning")));
      }

      dispatch({
        type: COLLECTION_ERROR,
      });
    }
  };
