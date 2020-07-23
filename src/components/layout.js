/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

import Header from './header';
import './layout.css';
import './layout-overrides.css';

const Layout = ({children}) => {
  const data = useStaticQuery (graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className="main-layout">
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteDesc={data.site.siteMetadata.description}
      />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
        className="main-wrapper"
      >
        <main className="main">{children}</main>
        {/* <footer className="main-footer">
          <span className="main-footer__text">
            © {new Date ().getFullYear ()} RJ Salvador <br />
          </span>
        </footer> */}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
