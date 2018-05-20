// @flow
import merge from 'lodash/merge';
import { getCookie } from '../access/cookie';

const dynamicHeaders = () => {
  const { token } = getCookie();
  if (token) {
    return {
      Authorization: `Bearer ${getCookie().token}`,
    };
  }
  return {};
};

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
          ...dynamicHeaders(),
        },
      },
    },
  )
);
