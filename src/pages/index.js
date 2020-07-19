import React from 'react';
import {DateTime} from 'luxon';

import {getNewHabit} from '../utils/random-utils';
import {computeInitialTables} from '../utils/table-utils';
import {generatePdf} from '../utils/pdf-utils';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SelectControl from '../components/select-control';
import MonthDrawers from '../components/month-drawers';
import {PAPER_OPTIONS, MONTH_OPTIONS, DEFAULT_MONTHS} from '../data/settings';

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
      openTable: computedTables[0],
    };

    this.handlePaperType = this.handlePaperType.bind (this);
    this.handleMonths = this.handleMonths.bind (this);
    this.getPdfDocument = this.getPdfDocument.bind (this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind (this);
    this.handleAddHabit = this.handleAddHabit.bind (this);
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

  handleDrawerOpen (month, clickEvt) {
    this.setState ({
      openTable: month,
    });
  }

  handleAddHabit (evt) {
    const targetId = evt.target.dataset.tableId;

    // find and change the given habit
    const tablesCopy = this.state.tables.map (tbl => {
      if (tbl.id === targetId) {
        const newTbl = {
          year: tbl.year,
          month: tbl.month,
          label: tbl.label,
          rows: tbl.rows,
          habits: tbl.habits,
        };
        newTbl.habits.push (getNewHabit ());
        return newTbl;
      }
      return tbl;
    });

    this.setState ({
      tables: tablesCopy,
    });
  }

  handleHabitTextChange (evt) {
    const targetId = evt.target.dataset.habitId;
    const targetValue = evt.target.value;

    // find and change the given habit
    const tablesCopy = this.state.tables.map (tbl => {
      const newTbl = {
        year: tbl.year,
        month: tbl.month,
        label: tbl.label,
        rows: tbl.rows,
      };
      newTbl.habits = tbl.habits.map (habit => {
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
      return newTbl;
    });

    this.setState ({
      tables: tablesCopy,
    });
  }

  getPdfDocument () {
    generatePdf (this.state.tables);
  }

  render () {
    const actions = {
      onOpen: this.handleDrawerOpen,
      onAddHabit: this.handleAddHabit,
      onDescChanged: this.handleHabitTextChange,
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

        <SelectControl
          label="Paper"
          selectedValue={this.state.paperType}
          values={PAPER_OPTIONS}
          onChange={this.handlePaperType}
        />

        <MonthDrawers
          months={this.state.tables}
          openMonth={this.state.openTable}
          numMonths={this.state.months.value}
          actions={actions}
        />

        <button
          className="rt-button rt-button--sheets"
          onClick={this.getPdfDocument}
        >
          Get routinetrax sheets
        </button>
      </Layout>
    );
  }
}

export default IndexPage;
