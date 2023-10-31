import React, { useState } from "react";
import { connect } from "react-redux";
import * as sessionActions from "../../redux/actions/sessionActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { newCredentials } from "../../model/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";
import { Navigate } from "react-router-dom";

const LoginPage = ({ session, actions, ...props }) => {
  const [credentials, setCredentials] = useState({ ...props.credentials });
  const [errors, setErrors] = useState({ ...props.errors });
  const [saving, setSaving] = useState(false);

  //name identifies the field that's changed
  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { username, password } = credentials;
    const errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    actions.session
      .loadSessionParse(credentials)
      .then(() => {
        toast.success("Successful Login");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setSaving(false);
        toast.error(error.message);
      });
  }

  if (!!session.sessionToken) {
    return <Navigate to="/" replace />
  }

  return saving ? (
    <Spinner />
  ) : (
    <LoginForm
      credentials={credentials}
      errors={errors}
      onChange={handleChange}
      onLogin={handleLogin}
      saving={saving}
    ></LoginForm>
  );
};

LoginPage.propTypes = {
  errors: PropTypes.array.isRequired,
  credentials: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    session: state.session,
    credentials: newCredentials,
    errors: [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      session: bindActionCreators(sessionActions, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
