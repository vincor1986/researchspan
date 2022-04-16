import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublication } from "../../actions/items";
import ResultsLoading from "../layout/ResultsLoading";
import AuthRoute from "../routing/AuthRoute";
import EditPublication from "./EditPublication";
import Publication from "./Publication";

const ViewPublication = ({
  search: { pubSearchResults },
  items: { publication, item_error },
  auth,
  getPublication,
}) => {
  const params = useParams();
  const { pubId } = params;
  const editMode = params["*"] === "edit";

  const [pub, setPub] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const pubInState = pubSearchResults.find((obj) => obj._id === pubId);

  useEffect(() => {
    if (!pubInState) {
      getPublication(pubId);
    } else {
      setPub(pubInState);
      console.log("publication set from state");
    }
  }, [pubInState, pubId, getPublication, setPub]);

  useEffect(() => {
    if (Object.keys(publication).length > 0 && !pubInState) {
      setPub(publication);
      console.log("publication set from fetch");
    }
  }, [publication, setPub, pubInState]);

  useEffect(() => {
    if (pub || item_error) {
      setLoading(false);
    }
  }, [pub, item_error]);

  const authUserPost =
    auth.user._id && pub && pub.user.toString() === auth.user._id.toString();

  const redirect = loading ? (
    <ResultsLoading firstLoad={true} />
  ) : pub ? (
    <AuthRoute
      item={pub}
      element={<EditPublication pub={pub} authUserPost={authUserPost} />}
    />
  ) : (
    <h4>No publication here</h4>
  );

  return (
    <Fragment>
      {editMode ? (
        redirect
      ) : loading ? (
        <ResultsLoading firstLoad={true} />
      ) : pub ? (
        <Publication pub={pub} authUserPost={authUserPost} />
      ) : (
        <h4>No publication here</h4>
      )}
    </Fragment>
  );
};

ViewPublication.propTypes = {
  search: PropTypes.object.isRequired,
  getPublication: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  items: state.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPublication })(ViewPublication);
