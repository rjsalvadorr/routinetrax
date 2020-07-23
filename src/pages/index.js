import React from 'react';
import {DateTime} from 'luxon';

import {getNewHabit} from '../utils/random-utils';
import {computeInitialTables, transformTables} from '../utils/table-utils';
import {generatePdf} from '../utils/pdf-utils';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SelectControl from '../components/select-control';
import MonthLists from '../components/month-lists';
import {
  PAPER_OPTIONS,
  MONTH_OPTIONS,
  DEFAULT_MONTHS,
  DEFAULT_ICON_MODE,
  DEFAULT_INCL_CURRENT_MTH,
} from '../data/settings';

class IndexPage extends React.Component {
  constructor (props) {
    super (props);

    const localDt = DateTime.local ();
    const computedTables = computeInitialTables (localDt.toObject ());

    this.state = {
      startDate: localDt.toObject (),
      paperType: PAPER_OPTIONS[0],
      months: DEFAULT_MONTHS,
      tables: computedTables,
      iconMode: DEFAULT_ICON_MODE,
      includeCurrentMonth: DEFAULT_INCL_CURRENT_MTH,
    };

    this.handlePaperType = this.handlePaperType.bind (this);
    this.handleMonths = this.handleMonths.bind (this);
    this.handleInclCurrentMonth = this.handleInclCurrentMonth.bind (this);
    
    this.handleAddRoutine = this.handleAddRoutine.bind (this);
    this.handleRemoveRoutine = this.handleRemoveRoutine.bind (this);
    this.handleClearRoutines = this.handleClearRoutines.bind (this);
    this.handleRoutineTextChange = this.handleRoutineTextChange.bind (this);

    this.getPdfDocument = this.getPdfDocument.bind (this);
    console.log(this.state);
  }

  handlePaperType (uiPaperType) {
    this.setState ({
      paperType: uiPaperType,
    });
  }

  handleMonths (uiMonths) {
    this.setState ({
      months: uiMonths,
    });
  }

  handleInclCurrentMonth (evt) {
    this.setState ({
      includeCurrentMonth: evt.target.checked,
    });
  }

  handleAddRoutine (evt) {
    const targetId = evt.target.dataset.tableId;

    const transform = (tbl) => {
      if(tbl.id === targetId) {
        tbl.habits.push (getNewHabit ());
      }
      return tbl;
    }

    this.setState ({
      tables: transformTables(this.state.tables, transform),
    });
  }

  handleRemoveRoutine (evt) {
    const targetId = evt.target.dataset.tableId;

    const transform = (tbl) => {
      if(tbl.id === targetId) {
        tbl.habits.pop();
      }
      return tbl;
    }

    this.setState ({
      tables: transformTables(this.state.tables, transform),
    });
  }

  handleClearRoutines (evt) {
    const targetId = evt.target.dataset.tableId;

    const transform = (tbl) => {
      if(tbl.id === targetId) {
        tbl.habits = [];
        tbl.habits.push (getNewHabit ());
      }
      return tbl;
    }

    this.setState ({
      tables: transformTables(this.state.tables, transform),
    });
  }

  handleRoutineTextChange (evt) {
    const targetId = evt.target.dataset.habitId;
    const targetValue = evt.target.value;

    const transform = (tbl) => {
      tbl.habits = tbl.habits.map (habit => {
        if (habit.id === targetId) {
          const newHabit = {
            icon: habit.icon,
            description: targetValue,
            id: habit.id,
          };
          return newHabit;
        } else {
          return habit;
        }
      });
      return tbl;
    }

    this.setState ({
      tables: transformTables(this.state.tables, transform),
    });
  }

  getPdfDocument () {
    generatePdf (this.getRenderedTables(), this.state.iconMode);
  }

  getRenderedTables() {
    const sliceStart = this.state.includeCurrentMonth ? 0 : 1;
    const sliceEnd = this.state.includeCurrentMonth ? this.state.months.value : this.state.months.value + 1;
    return this.state.tables.slice (sliceStart, sliceEnd);
  }

  render () {
    const actions = {
      onOpen: this.handleDrawerOpen,
      onAddHabit: this.handleAddRoutine,
      onRemoveHabit: this.handleRemoveRoutine,
      onClearHabits: this.handleClearRoutines,
      onDescChanged: this.handleRoutineTextChange,
    };

    return (
      <Layout>
        <SEO title="Home" />

        <SelectControl
          label="Months"
          selectedValue={this.state.months}
          values={MONTH_OPTIONS}
          onChange={this.handleMonths}
        />

        <div className="rt-control-group rt-control-group--checkbox">
          <input type="checkbox"
            className="rt-control rt-control--checkbox"
            name="include-current-month"
            defaultChecked={this.state.includeCurrentMonth}
            onChange={this.handleInclCurrentMonth}
          />
          <span className="label">Include current month</span>
        </div>

        <SelectControl
          label="Paper"
          selectedValue={this.state.paperType}
          values={PAPER_OPTIONS}
          onChange={this.handlePaperType}
          disabled={true}
        />

        <button
          className="rt-button rt-button--sheets"
          onClick={this.getPdfDocument}
        >
          Get routinetrax sheets
        </button>

        <MonthLists
          months={this.getRenderedTables()}
          iconMode={this.state.iconMode}
          actions={actions}
        />
      </Layout>
    );
  }
}

export default IndexPage;
