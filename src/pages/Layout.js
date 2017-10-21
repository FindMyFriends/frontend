import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid text-center">
      <div className="row content">
        <div className="col-sm-10 col-sm-offset-1 text-left">
          {children}
        </div>
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Layout;
