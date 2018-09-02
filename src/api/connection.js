// @flow
import { merge, pickBy } from 'lodash';
import * as Qs from 'qs';
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
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...dynamicHeaders(),
        },
      },
      paramsSerializer: params => Qs.stringify(pickBy(params, param => param !== ''), { arrayFormat: 'brackets' }),
    },
  );
}
