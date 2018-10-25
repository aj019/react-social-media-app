import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
const TextFieldGroup = ({
    name,
    type,
    error,
    label,
    placeholder,
    value,
    onChange,
    info,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error == null ? '' : <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.string
    
}
TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
