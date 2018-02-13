// @flow
import merge from 'lodash/merge';

export const defaults = (inherited: Object): Object => (
  merge(
    inherited,
    {
      baseURL: 'http://localhost',
      data: null,
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    },
  )
);
