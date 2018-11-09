import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
const TextAreaFieldGroup = ({
    name,
    error,
    placeholder,
    value,
    onChange,
    info
}) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error == null ? '' : <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func
    
}


export default TextAreaFieldGroup;
