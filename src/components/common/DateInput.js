import React from "react"
import PropTypes from "prop-types"

const DateInput = ({ name, label, value, onChange, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass} style={{margin:"10px"}}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input type="date" name={name} className="form-control" placeholder={value}
                    onChange={onChange}
                    value={value}
                    min="2018-01-01" max="2024-12-31"></input>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

DateInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};


export default DateInput;