import React from 'react';
import {DateTime} from 'luxon';

import {computeMonthRows, computeTables} from '../utils/time-calcs';
import {generatePdf} from '../utils/pdf-utils';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SelectControl from '../components/select-control';
import MonthDrawers from '../components/month-drawers';
import {
  paperOptions,
  monthOptions,
  DEFAULT_MONTHS,
} from '../data/setup-values';

class IndexPage extends React.Component {
  constructor (props) {
    super (props);

    const localDt = DateTime.local ();
    const computedTables = computeTables (localDt.toObject ());

    this.state = {
      startDate: localDt.toObject (),
      // INVESTIGATE: is endDate even used?
      endDate: localDt.plus ({months: DEFAULT_MONTHS}).toObject (),
      paperType: paperOptions[0],
      months: DEFAULT_MONTHS,
      habits: [
        {
          icon: 'thing-1',
          description: 'Resemble intellectual figs',
        },
        {
          icon: 'thing-2',
          description: 'Name a humorous peach',
        },
        {
          icon: 'thing-3',
          description: 'Separate peaches from dogs',
        },
      ],
      tables: computedTables,
      openTable: computedTables[0],
    };

    this.handleStartDate = this.handleStartDate.bind (this);
    this.handleEndDate = this.handleEndDate.bind (this);
    this.handlePaperType = this.handlePaperType.bind (this);
    this.handleMonths = this.handleMonths.bind (this);
    this.getPdfDocument = this.getPdfDocument.bind (this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind (this);
  }

  handleStartDate (uiDate) {
    const newDate = DateTime.fromJSDate (uiDate);
    this.setState ({
      startDate: newDate.toObject (),
      tables: [computeMonthRows (newDate.toObject ())],
    });
  }

  handleEndDate (uiDate) {
    const newDate = DateTime.fromJSDate (uiDate);
    this.setState ({
      endDate: newDate.toObject (),
      tables: [computeMonthRows (newDate.toObject ())],
    });
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
    this.setState({
      openTable: month,
    })
  }

  getPdfDocument () {
    generatePdf (this.state.tables);
  }

  render () {
    return (
      <Layout>
        <SEO title="Home" />

        <SelectControl
            label="Months"
            selectedValue={this.state.months}
            values={monthOptions}
            onChange={this.handleMonths}
        />
        <SelectControl
            label="Paper"
            selectedValue={this.state.paperType}
            values={paperOptions}
            onChange={this.handlePaperType}
        />

        <MonthDrawers months={this.state.tables} openMonth={this.state.openTable} openHandler={this.handleDrawerOpen}/>

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
