import React from "react"
import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"

import { getNewRoutine } from "../utils/random-utils"
import { computeInitialTables, transformTables } from "../utils/table-utils"
import { generatePdf } from "../utils/pdf-utils"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MonthLists from "../components/month-lists"
import ControlPanel from "../components/control-panel"

import {
  PAPER_OPTIONS,
  MONTH_OPTIONS,
  DEFAULT_MONTHS,
  DEFAULT_ICON_MODE,
  DEFAULT_INCL_CURRENT_MTH,
} from "../data/settings"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    const localDt = DateTime.local()
    const computedTables = computeInitialTables(localDt.toObject())

    this.state = {
      startDate: localDt.toObject(),
      paperType: PAPER_OPTIONS[0],
      months: DEFAULT_MONTHS,
      tables: computedTables,
      iconMode: DEFAULT_ICON_MODE,
      includeCurrentMonth: DEFAULT_INCL_CURRENT_MTH,
    }

    this.handlePaperType = this.handlePaperType.bind(this)
    this.handleMonths = this.handleMonths.bind(this)
    this.handleInclCurrentMonth = this.handleInclCurrentMonth.bind(this)

    this.handleAddRoutine = this.handleAddRoutine.bind(this)
    this.handleRemoveRoutine = this.handleRemoveRoutine.bind(this)
    this.handleClearRoutines = this.handleClearRoutines.bind(this)
    this.handleRoutineTextChange = this.handleRoutineTextChange.bind(this)

    this.getPdfDocument = this.getPdfDocument.bind(this)
    // console.log('initial state', this.state)
  }

  handlePaperType(uiPaperType) {
    this.setState({
      paperType: uiPaperType,
    })
  }

  handleMonths(uiMonths) {
    this.setState({
      months: uiMonths,
    })
  }

  handleInclCurrentMonth(evt) {
    this.setState({
      includeCurrentMonth: evt.target.checked,
    })
  }

  handleAddRoutine(targetId) {
    const transform = tbl => {
      if (tbl.id === targetId) {
        tbl.habits.push(getNewRoutine())
      }
      return tbl
    }

    this.setState({
      tables: transformTables(this.state.tables, transform),
    })
  }

  handleRemoveRoutine(targetId) {
    const transform = tbl => {
      if (tbl.id === targetId) {
        tbl.habits.pop()
      }
      return tbl
    }

    this.setState({
      tables: transformTables(this.state.tables, transform),
    })
  }

  handleClearRoutines(targetId) {
    const transform = tbl => {
      if (tbl.id === targetId) {
        tbl.habits = []
        tbl.habits.push(getNewRoutine())
      }
      return tbl
    }

    this.setState({
      tables: transformTables(this.state.tables, transform),
    })
  }

  handleRoutineTextChange(targetId, evt) {
    const targetValue = evt.target.value

    const transform = tbl => {
      tbl.habits = tbl.habits.map(habit => {
        if (habit.id === targetId) {
          const newHabit = {
            icon: habit.icon,
            description: targetValue,
            id: habit.id,
          }
          return newHabit
        } else {
          return habit
        }
      })
      return tbl
    }

    this.setState({
      tables: transformTables(this.state.tables, transform),
    })
  }

  getPdfDocument() {
    generatePdf(this.getRenderedTables(), this.state.iconMode)
  }

  getRenderedTables() {
    const sliceStart = this.state.includeCurrentMonth ? 0 : 1
    const sliceEnd = this.state.includeCurrentMonth
      ? this.state.months.value
      : this.state.months.value + 1

    const freshTables = this.state.tables.slice(sliceStart, sliceEnd)
    const firstEl = freshTables[0]
    const secondEl = freshTables[1]
    const tag = "first"

    if (firstEl && firstEl.tags && !firstEl.tags.includes(tag)) {
      firstEl.tags.push(tag)
    }

    if (secondEl && secondEl.tags && secondEl.tags.includes(tag)) {
      const idx = secondEl.tags.indexOf(tag)
      if (idx > -1) {
        secondEl.tags.splice(idx, 1)
      }
    }

    return freshTables
  }

  render() {
    const routineActions = {
      onOpen: this.handleDrawerOpen,
      onAddHabit: this.handleAddRoutine,
      onRemoveHabit: this.handleRemoveRoutine,
      onClearHabits: this.handleClearRoutines,
      onDescChanged: this.handleRoutineTextChange,
    }

    const controls = [
      {
        id: uuidv4(),
        type: "select",
        label: "Months",
        name: "months",
        value: this.state.months,
        values: MONTH_OPTIONS,
        handler: this.handleMonths,
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "select",
        label: "Paper",
        name: "paper",
        value: this.state.paperType,
        values: PAPER_OPTIONS,
        handler: this.handlePaperType,
        tags: ["disabled"],
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "button",
        label: "Save",
        name: "save",
        handler: () => {},
        tags: ["disabled"],
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "checkbox",
        label: "Include current month",
        name: "incl-current-month",
        value: this.state.includeCurrentMonth,
        handler: this.handleInclCurrentMonth,
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "button",
        label: "Clear",
        name: "clear",
        handler: () => {},
        tags: ["disabled"],
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "button",
        label: "Load",
        name: "load",
        handler: () => {},
        tags: ["disabled"],
        unitSize: 1,
      },
      {
        id: uuidv4(),
        type: "button",
        label: "Get routinetrax sheets",
        name: "generate-pdf",
        handler: this.getPdfDocument,
        tags: ["primary"],
        unitSize: 3,
      },
    ]

    return (
      <Layout>
        <SEO title="Home" />
        <div className="intro">
          <div className="intro-img__wrapper">
            <img className="intro-img" src={"/example.jpg"} alt="example" />
          </div>
          <div className="intro-text__wrapper">
            <h2>what is routinetrax?</h2>
            <p className="intro-text">
              routinetrax is a monthly routine tracking system. It lets users
              track several routines over the course of a month through printed
              sheets. The sheets feature a tracking grid, which shows patterns
              that are easy to notice and reason about.
            </p>
            <p className="intro-text">
              TL;DR --- This system fits a month's worth of journal entries into
              one sheet of paper, and gives insight into a person's routines
              over time.
            </p>
            <h2>who is this for?</h2>
            <p className="intro-text">
              If you can describe yourself as "obsessive", "A-type", or a
              "self-improvement fanatic", you might find this useful. Or if you
              want to get the benefits of a journal, but focused entirely on the
              actions you take.{" "}
            </p>
            <p>
              For more info, check out the{" "}
              <a href="https://github.com/rjsalvadorr/routinetrax">
                GitHub page
              </a>
              .
            </p>
          </div>
        </div>
        <ControlPanel controls={controls} />
        <MonthLists
          months={this.getRenderedTables()}
          iconMode={this.state.iconMode}
          actions={routineActions}
        />
      </Layout>
    )
  }
}

export default IndexPage
