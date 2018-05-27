import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tabs as MUITabs, Tab } from 'material-ui/Tabs';

const Tabs = ({
  children, match: { params: { id }, path },
}) => (
  <React.Fragment>
    <MUITabs value={path}>
      <Tab
        label="Evolution"
        value="/evolutions/:id"
        containerElement={<Link to={`/evolutions/${id}`} />}
      />
    </MUITabs>
    {children}
  </React.Fragment>
);

Tabs.propTypes = {
  children: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Tabs;
