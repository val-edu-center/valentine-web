import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, placeholder, value, error, secureTextEntry }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        {getInput(secureTextEntry, name, placeholder, onChange, value)}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const getInput = (secureTextEntry, name, placeholder, onChange, value) => {
  if (secureTextEntry) {
    return <input
      type="password"
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  } else {
    return <input
      type="text"
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  secureTextEntry: PropTypes.bool
};

export default TextInput;
