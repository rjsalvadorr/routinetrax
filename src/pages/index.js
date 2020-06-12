import React from 'react';
// import {Link} from 'gatsby';
import Select from 'react-select';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';

import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';

import 'react-calendar/dist/Calendar.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const paperOptions = [
    { value: 'letter', label: 'Letter' },
    { value: 'a4', label: 'A4' },
]

const computeMonthRows = (dtObj) => {
    const yr = dtObj.year;
    const mon = dtObj.month;
    const dt = DateTime.fromObject({ year: yr, month: mon });

    const monthRows = [];
    for (let dy = 1; dy <= dt.daysInMonth; dy++) {
        const dayStr = DateTime.fromObject({ year: yr, month: mon, day: dy }).toFormat('ccc dd');
        monthRows.push(dayStr);
    }

    console.log(monthRows);
    return monthRows;
}

const computeTables = (startMonthObj) => {
    const start = DateTime.fromObject(startMonthObj);
    const tables = [];
    const numMonths = 6;

    tables.push({
        year: start.year,
        month: start.monthLong,
        rows: computeMonthRows(start)
    });
    for (let offset = 1; offset < numMonths; offset++) {
        const currentDt = start.plus({ months: offset });
        tables.push({
            year: currentDt.year,
            month: currentDt.monthLong,
            rows: computeMonthRows(currentDt)
        });
    }

    console.log(tables);
    return tables;
}

const renderTableRows = (tableRows, yr, mon) => {
    return tableRows.map((row) => {
        return (
            <tr key={`${yr} ${mon} ${row}`}>
                <td>{row}</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
            </tr>
        )
    });
}

const renderTable = (tableData) => {
    const tableRows = tableData.rows;
    const yr = tableData.year;
    const mon = tableData.month;
    const tableName = `${mon} ${yr}`;
    return (
        <div className="rt-table-wrapper" key={tableName}>
            <h2>{tableName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>day</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows(tableRows, yr, mon)}
                </tbody>
            </table>
        </div>
    )
}

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        const localDt = DateTime.local();

        this.state = {
            startDate: localDt.toObject(),
            endDate: localDt.plus({ months: 3 }).toObject(),
            paperType: paperOptions[0],
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
            tables: computeTables(localDt.toObject()),
        };

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handlePaperType = this.handlePaperType.bind(this);
        console.log('init complete!', this.state);
    }

    handleStartDate(uiDate) {
        const newDate = DateTime.fromJSDate(uiDate);
        this.setState({
            startDate: newDate.toObject(),
            tables: [computeMonthRows(newDate.toObject())]
        });
    }

    handleEndDate(uiDate) {
        const newDate = DateTime.fromJSDate(uiDate);
        this.setState({
            endDate: newDate.toObject(),
            tables: [computeMonthRows(newDate.toObject())]
        });
    }

    handlePaperType(uiPaperType) {
        this.setState({
            paperType: uiPaperType
        });
    }

    render() {
        // const displayStartDate = DateTime.fromObject(this.state.startDate).toJSDate();
        // const displayEndDate = DateTime.fromObject(this.state.endDate).toJSDate();

        const tableData = this.state.tables;
        let tables = [];
        if (tableData.length != 0) {
          tables = tableData.map((tbl) => {
            return renderTable(tbl)
          });
        }

        return (
            <Layout>
                <SEO title="Home" />
                <h1>routinetrax</h1>
                <p>Paper-based habits tracking, supercharged</p>

                {/* <div className="control-group">
          <span className="label">Starting month</span>
          <Calendar
            className="rt-control rt-control--calendar"
            onChange={this.handleStartDate}
            value={displayStartDate}
            maxDetail="year"
            minDetail="year"
            defaultView="year"
          />
        </div>
        <div className="control-group">
          <span className="label">Ending month</span>
          <Calendar
            className="rt-control rt-control--calendar"
            onChange={this.handleEndDate}
            value={displayEndDate}
            maxDetail="year"
            minDetail="year"
            defaultView="year"
          />
        </div> */}

                <div className="control-group">
                    <span className="label">Paper type</span>
                    <Select
                        className="rt-control rt-control--select"
                        value={this.state.paperType}
                        options={paperOptions}
                        onChange={this.handlePaperType}
                    />
                </div>
                <div className="control-group">
                    <span className="label">Title</span>
                    <input className="rt-control rt-control--text"
                        type="text"
                        id="title"
                        name="title"
                        required maxLength="20"
                    />
                </div>
                <div className="control-group">
                    <span className="label">Icon</span>
                    <Select className="rt-control rt-control--select" options={options} />
                </div>
                <div className="control-group">
                    <span className="label">Habit</span>
                    <input className="rt-control rt-control--text" type="text" id="habit-1" name="habit-1" required maxLength="20" />
                </div>

                {tables}
            </Layout>
        );
    }
}

export default IndexPage;
