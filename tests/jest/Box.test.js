import React from 'react';
import 'raf/polyfill';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Box } from './../../src/soulmate/output/Box';

it('try again for no searches', () => {
  const match = (
    <MuiThemeProvider>
      <Box soulmates={[{ id: null }]} requests={[]} onRefresh={() => {}} />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(match)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('try again for no searches with again button', () => {
  const match = (
    <MuiThemeProvider>
      <Box soulmates={[{ id: null }]} requests={[{ is_refreshable: true }]} onRefresh={() => {}} />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(match)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('table with matches for some searches', () => {
  const match = (
    <MuiThemeProvider>
      <Box
        soulmates={
          [
            {
              related_at: '2018-03-31T12:37:08+00:00',
              searched_at: '2018-03-31T12:37:08+00:00',
              evolution_id: '2wrWlWqMg7DY',
              demand_id: '2wrWlWqMg7DZ',
              id: 1,
              is_correct: true,
              new: true,
              seeker_id: 0,
              position: 1,
              ownership: 'yours',
            },
          ]
        }
        requests={[{ is_refreshable: true }]}
        onRefresh={() => {}}
      />
    </MuiThemeProvider>
  );
  const tree = renderer
    .create(match)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
