import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as MUITabs, Tab } from 'material-ui/Tabs';

const Tabs = ({ children, history, demand, match: { params: { id }, path } }) => (
  <React.Fragment>
    <MUITabs value={path}>
      <Tab
        label="Demand"
        value="/demands/:id"
        onActive={() => history.push(`/demands/${id}`)}
      />
      <Tab
        label={`Soulmates (${demand.soulmates.length})`}
        value="/demands/:id/soulmates"
        onActive={() => history.push(`/demands/${id}/soulmates`)}
      />
    </MUITabs>
    {children}
  </React.Fragment>
);

Tabs.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Tabs;
