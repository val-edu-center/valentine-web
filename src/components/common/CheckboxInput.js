import React from "react"
import PropTypes from "prop-types"

const CheckboxInput = ({ name, label, values, options, onChange, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label><br/>
            <input type="checkbox" name="select-all" onChange={onChange}></input>
            <label htmlFor="select-all"><strong>Select All</strong></label>
            {options.map(option => buildInput(option, values, onChange))}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

const buildInput = (name, values, onChange) => {
    return <div key={name}>
        <input type="checkbox" name={name} onChange={onChange} checked={values.includes(name)}></input>
        <label htmlFor={name}>{name}</label>
    </div>
}

CheckboxInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.array,
    options: PropTypes.array.isRequired,
    error: PropTypes.string
};

export default CheckboxInput;