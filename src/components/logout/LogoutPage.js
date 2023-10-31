import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as sessionActions from "../../redux/actions/sessionActions";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const LogoutPage = ({ session, actions }) => {
  useEffect(() => {
    if (session.sessionToken) {
      actions.sessions.removeSession();
    }
    //useEffect with an empty array is equivalent to componentDidMount
    //Otherwise, would run everytime it renders
  }, []);
  return (
    <>
      <h1>Logging out...</h1>
      <Navigate to="/"></Navigate>
    </>
  );
};

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sessions: bindActionCreators(sessionActions, dispatch),
    },
  };
}

LogoutPage.propTypes = {
  actions: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
