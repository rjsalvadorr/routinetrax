import PropTypes from "prop-types"
import React from "react"
import SelectControl from "./select-control"

import "./control-panel.css"

const buildControl = ctrl => {
  const isDisabled = ctrl.tags && ctrl.tags.includes("disabled")

  if (ctrl.type === "select") {
    return (
      <SelectControl
        label={ctrl.label}
        selectedValue={ctrl.value}
        values={ctrl.values}
        onChange={ctrl.handler}
        disabled={isDisabled}
        unitSize={ctrl.unitSize}
        key={ctrl.id}
      />
    )
  } else if (ctrl.type === "checkbox") {
    return (
      <div
        className={`rt-control-group rt-control-group--checkbox size-${ctrl.unitSize}`}
        key={ctrl.id}
      >
        <input
          type="checkbox"
          className="rt-control rt-control--checkbox"
          name={ctrl.name}
          defaultChecked={ctrl.value}
          onChange={ctrl.handler}
        />
        <span className="label checkbox-label">{ctrl.label}</span>
      </div>
    )
  } else if (ctrl.type === "button") {
    return (
      <div
        className={`rt-control-group rt-control-group--button size-${ctrl.unitSize}`}
        key={ctrl.id}
      >
        <button
          className="rt-button rt-button--sheets"
          onClick={ctrl.handler}
          disabled={isDisabled}
        >
          {ctrl.label}
        </button>
      </div>
    )
  }

  return null
}

const buildControls = controls => {
  return controls.map(ctrl => {
    return buildControl(ctrl)
  })
}

const ControlPanel = props => (
  <div className="control-panel">
    <div className="control-panel__list">
      {buildControls(props.controls)}
      {props.children}
    </div>
  </div>
)

ControlPanel.propTypes = {
  controls: PropTypes.array,
}

ControlPanel.defaultProps = {
  controls: [],
}

export default ControlPanel
