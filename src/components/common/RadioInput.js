import React from "react"
import PropTypes from "prop-types"

const RadioInput = ({ name, label, value, options, onChange, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }
    return (<>
        <label htmlFor={name}>{label}</label><div className={wrapperClass}>
            {options.map(option => buildInput(option, value, onChange))}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
        </>

    );
};

const buildInput = (name, value, onChange) => {
    return <div key={name}>
        <input type="radio" name={name} onChange={onChange} checked={value === name}></input>
        <label htmlFor={name}>{name}</label>
    </div>
}

RadioInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    options: PropTypes.array.isRequired,
    error: PropTypes.string
};


export default RadioInput;