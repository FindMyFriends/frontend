// @flow
import merge from 'lodash/merge';
import { getCookie } from '../access/cookie';

const dynamicHeaders = (): Object => {
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
      baseURL: 'https://fmf.localhost',
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
