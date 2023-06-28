import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const LoginForm = ({
  credentials,
  onLogin,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onLogin}>
      <h2>Login</h2>
      <TextInput
        name="username"
        label="Username"
        value={credentials.username}
        onChange={onChange}
        error={errors.username}
      />
      <TextInput
        name="password"
        label="Password"
        secureTextEntry={true}
        value={credentials.password}
        onChange={onChange}
        error={errors.password}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default LoginForm;
