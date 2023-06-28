import React from "react"
import PropTypes from "prop-types"

const FileInput = ({ name, label, value, onChange, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass} style={{margin:"10px"}}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input type="file" name={name} className="form-control"
                    onChange={onChange}
                    value={value}></input>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool
};


export default FileInput;