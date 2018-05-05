import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tabs as MUITabs, Tab } from 'material-ui/Tabs';

const Tabs = ({
  children, soulmateMatches, match: { params: { id }, path },
}) => (
  <React.Fragment>
    <MUITabs value={path}>
      <Tab
        label="Demand"
        value="/demands/:id"
        containerElement={<Link to={`/demands/${id}`} />}
      />
      <Tab
        label={`Soulmates (${soulmateMatches})`}
        value="/demands/:id/soulmates"
        containerElement={<Link to={`/demands/${id}/soulmates`} />}
      />
    </MUITabs>
    {children}
  </React.Fragment>
);

Tabs.propTypes = {
  children: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  soulmateMatches: PropTypes.number.isRequired,
};

export default Tabs;
