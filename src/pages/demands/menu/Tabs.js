import React from 'react';
import { Tabs as MUITabs, Tab } from 'material-ui/Tabs';

const Tabs = ({ children, history, match: { params: { id }, path } }) => (
  <React.Fragment>
    <MUITabs value={path}>
      <Tab
        label="Demand"
        value="/demands/:id"
        onActive={() => history.push(`/demands/${id}`)}
      />
      <Tab
        label="Soulmates"
        value="/demands/:id/soulmates"
        onActive={() => history.push(`/demands/${id}/soulmates`)}
      />
    </MUITabs>
    {children}
  </React.Fragment>
);

export default Tabs;
