import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
const InputGroup = ({
    name,
    error,
    placeholder,
    value,
    onChange,
    icon,
    type
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend" >
                <span className="input-group-text" >
                    <i className={icon} />
                </span>
            </div>
            <input
                className={classnames("form-control form-control-lg", { "is-invalid": error })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
            />
            {error == null ? '' : <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func
    
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;
