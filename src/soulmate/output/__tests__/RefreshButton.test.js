import React from 'react';
import renderer from 'react-test-renderer';
import 'raf/polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RefreshButton } from '../Box';

it('ready refresh indicator for available refresh', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: true }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('no indicator for done task', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: false, status: 'succeed' }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
