import React from 'react';
import Select from 'react-select';
import { DateTime } from 'luxon';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { computeMonthRows, computeTables } from '../utils/time-calcs';
import { generatePdf } from '../utils/pdf-utils';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const paperOptions = [
    { value: 'letter', label: 'Letter' },
    { value: 'a4', label: 'A4' },
]

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
        this.getPdfDocument = this.getPdfDocument.bind(this);
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

    getPdfDocument() {
        generatePdf(this.state.tables);
    }

    render() {
        return (
            <Layout>
                <SEO title="Home" />
                <h1>routinetrax</h1>
                <p>Paper-based habits tracking, supercharged</p>

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

                <button className="rt-button rt-button--sheets" onClick={this.getPdfDocument}>Get routinetrax sheets</button>
            </Layout>
        );
    }
}

export default IndexPage;
