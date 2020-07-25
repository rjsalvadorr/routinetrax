import PropTypes from "prop-types"
import React from "react"
import Select from "react-select"

import "./select-control.css"

const SelectControl = ({
  label,
  selectedValue,
  values,
  onChange,
  disabled = false,
  unitSize = 1,
}) => {
  const disabledClass = disabled ? "disabled" : null
  return (
    <div
      className={`rt-control-group rt-control-group--select size-${unitSize} ${disabledClass}`}
    >
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
}

SelectControl.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  values: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  unitSize: PropTypes.number,
}

SelectControl.defaultProps = {
  label: "",
  selectedValue: null,
  values: [],
  onChange: () => {},
  disabled: false,
  unitSize: 1,
}

export default SelectControl
