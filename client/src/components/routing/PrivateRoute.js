import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, auth: { isAuthenticated, loading } }) => {
  const navigate = useNavigate();

  if (!isAuthenticated && !loading) {
    navigate("/login", { replace: false });
  }

  return element;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
