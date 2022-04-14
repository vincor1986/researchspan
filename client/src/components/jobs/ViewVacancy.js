import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Vacancy from "./Vacancy";
import EditVacancy from "./EditVacancy";
import AuthRoute from "../routing/AuthRoute";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getVacancy } from "../../actions/jobs";
import ResultsLoading from "../layout/ResultsLoading";

const ViewVacancy = ({
  search: { jobSearchResults },
  items: { job, item_error },
  auth,
  getVacancy,
}) => {
  const params = useParams();
  const { jobId } = params;

  const [vacancy, setVacancy] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const editMode = params["*"] === "edit";

  const vacancyInState = jobSearchResults.find((obj) => obj._id === jobId);

  useEffect(() => {
    if (!vacancyInState) {
      getVacancy(jobId);
    } else {
      setVacancy(vacancyInState);
      console.log("vacancy set from state");
    }
  }, [vacancyInState, jobId, getVacancy, setVacancy]);

  useEffect(() => {
    if (Object.keys(job).length > 0 && !vacancyInState) {
      setVacancy(job);
      console.log("vacancy set from fetch");
    }
  }, [job, setVacancy, vacancyInState]);

  useEffect(() => {
    if (vacancy || item_error) {
      setLoading(false);
    }
  }, [vacancy, item_error]);

  const authUserJob =
    auth.user._id &&
    vacancy &&
    vacancy.user.toString() === auth.user._id.toString();

  const redirect = loading ? (
    <ResultsLoading firstLoad={true} />
  ) : vacancy ? (
    <AuthRoute
      item={vacancy}
      element={<EditVacancy vacancy={vacancy} authUserJob={authUserJob} />}
    />
  ) : (
    <h4>No vacancy here</h4>
  );

  return (
    <Fragment>
      {editMode ? (
        redirect
      ) : loading ? (
        <ResultsLoading firstLoad={true} />
      ) : vacancy ? (
        <Vacancy vacancy={vacancy} authUserJob={authUserJob} />
      ) : (
        <h4>No vacancy here</h4>
      )}
    </Fragment>
  );
};

ViewVacancy.propTypes = {
  search: PropTypes.object.isRequired,
  getVacancy: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVacancy })(ViewVacancy);
