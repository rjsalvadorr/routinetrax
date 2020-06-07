import React from 'react';
// import {Link} from 'gatsby';
import Select from 'react-select';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';

import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

const paperOptions = [
  {value: 'letter', label: 'Letter'},
  {value: 'a4', label: 'A4'},
]

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    const localDt = DateTime.local();
    const currentDate = localDt.toObject();
    const endDate = localDt.plus({months: 3}).toObject();

    this.state = {
      startMonth: {
        year: currentDate.year,
        month: currentDate.month,
      },
      endMonth: {
        year: endDate.year,
        month: endDate.month,
      },
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
    };

    console.log('init complete!', this.state);
  }

  handleStartDate(evt) {
    console.log('handleStartDate()', evt);
  }

  handleEndDate(evt) {
    console.log('handleEndDate()', evt);
  }

  handlePaperType(evt) {
    console.log('handlePaperType()', evt);
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>routinetrax</h1>
        <p>Paper-based habits tracking, supercharged</p>

        <div className="control-group">
          <span className="label">Starting month</span>
          <Calendar
            className="rt-control rt-control--calendar"
            onChange={this.handleStartDate}
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
            maxDetail="year"
            minDetail="year"
            defaultView="year"
          />
        </div>
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
          <Select className="rt-control rt-control--select" options={options}/>
        </div>
        <div className="control-group">
          <span className="label">Habit</span>
          <input className="rt-control rt-control--text" type="text" id="habit-1" name="habit-1" required maxLength="20" />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
