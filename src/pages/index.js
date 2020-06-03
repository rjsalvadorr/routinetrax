import React from 'react';
// import {Link} from 'gatsby';
import Select from 'react-select';
import Calendar from 'react-calendar';


import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>routinetrax</h1>
    <p>Paper-based habits tracking, supercharged</p>

    <div class="control-group">
      <span class="label">Starting month</span>
      <Calendar className="rt-control rt-control--calendar" maxDetail="year"  minDetail="year" defaultView="year"/>
    </div>
    <div class="control-group">
      <span class="label">Ending month</span>
      <Calendar className="rt-control rt-control--calendar" maxDetail="year"  minDetail="year" defaultView="year"/>
    </div>
    <div class="control-group">
      <span class="label">Paper type</span>
      <Select className="rt-control rt-control--select" options={options}/>
    </div>
    <div class="control-group">
      <span class="label">Title</span>
      <input class="rt-control rt-control--text" type="text" id="title" name="title" required maxlength="20" />
    </div>
    <div class="control-group">
      <span class="label">Icon</span>
      <Select className="rt-control rt-control--select" options={options}/>
    </div>
    <div class="control-group">
      <span class="label">Habit</span>
      <input class="rt-control rt-control--text" type="text" id="habit-1" name="habit-1" required maxlength="20" />
    </div>

  </Layout>
);

export default IndexPage;
