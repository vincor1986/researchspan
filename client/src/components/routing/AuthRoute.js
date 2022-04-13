import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({
  element,
  auth: { user, isAuthenticated, loading },
  item,
}) => {
  const navigate = useNavigate();

  const [isAuthUser, setIsAuthUser] = useState(undefined);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }

    if (user._id === item.user) {
      setIsAuthUser(true);
    } else {
      setIsAuthUser(false);
    }
  }, [loading, isAuthenticated]);

  return isAuthUser ? (
    element
  ) : isAuthUser === false ? (
    <div className="main-body-container">
      <h4>You are not permitted to access this page</h4>
    </div>
  ) : (
    ""
  );
};

AuthRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);
