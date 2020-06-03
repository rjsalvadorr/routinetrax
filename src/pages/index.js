import React from 'react';
import {Link} from 'gatsby';
import Select from 'react-select';

import Layout from '../components/layout';
import Image from '../components/image';
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

    <Select
      value={options[0]}
      onChange={() => {
        console.log('changed select');
      }}
      options={options}
    />
  </Layout>
);

export default IndexPage;
