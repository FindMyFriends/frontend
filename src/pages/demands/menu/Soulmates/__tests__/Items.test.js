import React from 'react';
import renderer from 'react-test-renderer';
import 'raf/polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RefreshButton } from '../Items';

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

it('not available indicator for done task', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: false, is_seeking: false }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('blocked indicator for pending task', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: false, is_seeking: true }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('ready refresh indicator for available refresh', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: true, is_seeking: false }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('nothing for empty request', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('first block for seeking', () => {
  const component = (
    <MuiThemeProvider>
      <RefreshButton
        requests={[{ is_refreshable: true, is_seeking: true }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
