import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { COLORS } from '../data/settings'

const headerColor = '#ffffff';

const Header = ({
  siteTitle,
  siteDesc,
}) => (
  <header
    style={{
      background: COLORS.green,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 className="page-title" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: headerColor,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      {siteDesc &&
        <span className="page-subtitle" style={{ color: headerColor }} >{siteDesc}</span>
      }
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDesc: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  siteDesc: ``,
}

export default Header
