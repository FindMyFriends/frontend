// @flow
import merge from 'lodash/merge';
import { getCookie } from '../access/cookie';

const dynamicHeaders = (): Object => {
  const { token } = getCookie();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

export default function withSettings(inherited: Object): Object {
  return merge(
    inherited,
    {
      baseURL: 'https://api.fmf.localhost',
      data: null,
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...dynamicHeaders(),
        },
      },
    },
  );
}
