import PropTypes from "prop-types"
import React from "react"
import Select from 'react-select';

import "./select-control.css"

const SelectControl = ({
  label,
  selectedValue,
  values,
  onChange,
  disabled = false,
}) => (
  <div className="rt-control-group rt-control-group--select">
    <span className="label">{label}</span>
    <br />
    <Select
      className="rt-control rt-control--select"
      value={selectedValue}
      options={values}
      onChange={onChange}
      isDisabled={disabled}
    />
  </div>
)

SelectControl.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  values: PropTypes.array,
  onChange: PropTypes.func,
}

SelectControl.defaultProps = {
  label: '',
  selectedValue: null,
  values: [],
  onChange: () => {},
}

export default SelectControl
