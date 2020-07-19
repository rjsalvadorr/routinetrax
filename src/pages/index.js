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
    };

    this.handlePaperType = this.handlePaperType.bind (this);
    this.handleMonths = this.handleMonths.bind (this);
    this.getPdfDocument = this.getPdfDocument.bind (this);
    this.handleAddHabit = this.handleAddHabit.bind (this);
    this.handleRemoveHabit = this.handleRemoveHabit.bind (this);
    this.handleClearHabits = this.handleClearHabits.bind (this);
    this.handleHabitTextChange = this.handleHabitTextChange.bind (this);
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

  handleAddHabit (evt) {
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

  handleRemoveHabit (evt) {
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

  handleClearHabits (evt) {
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

  handleHabitTextChange (evt) {
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
    const renderedTables = this.state.tables.slice (0, this.state.months.value);
    generatePdf (renderedTables, this.state.iconMode);
  }

  render () {
    const actions = {
      onOpen: this.handleDrawerOpen,
      onAddHabit: this.handleAddHabit,
      onRemoveHabit: this.handleRemoveHabit,
      onClearHabits: this.handleClearHabits,
      onDescChanged: this.handleHabitTextChange,
    };
    const renderedTables = this.state.tables.slice (0, this.state.months.value);

    return (
      <Layout>
        <SEO title="Home" />

        <SelectControl
          label="Months"
          selectedValue={this.state.months}
          values={MONTH_OPTIONS}
          onChange={this.handleMonths}
        />

        {/* <SelectControl
          label="Paper"
          selectedValue={this.state.paperType}
          values={PAPER_OPTIONS}
          onChange={this.handlePaperType}
        /> */}

        <button
          className="rt-button rt-button--sheets"
          onClick={this.getPdfDocument}
        >
          Get routinetrax sheets
        </button>

        <MonthLists
          months={renderedTables}
          iconMode={this.state.iconMode}
          actions={actions}
        />
      </Layout>
    );
  }
}

export default IndexPage;
