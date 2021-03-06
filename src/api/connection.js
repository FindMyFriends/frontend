// @flow
import { merge, pickBy } from 'lodash';
import * as Qs from 'qs';
import * as session from '../access/session';

export default function withSettings(inherited: Object): Object {
  return merge(
    inherited,
    {
      baseURL: 'https://api.fmf.localhost',
      maxRedirects: 0,
      timeout: 1000,
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      transformRequest: [...inherited.transformRequest, (data, headers) => {
        const value = session.getValue();
        if (value) {
          headers['Authorization'] = `Bearer ${value}`; // eslint-disable-line
        }
        return data;
      }],
      paramsSerializer: params => Qs.stringify(pickBy(params, param => param !== ''), { arrayFormat: 'brackets' }),
    },
  );
}
