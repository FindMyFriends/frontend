// @flow

import { merge } from 'lodash';
import { unflatten } from 'flat';

export const flattenChange = (event: Object, name: string, state: Object) => (
  merge(
    state,
    unflatten({
      [name]: event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value,
    }),
  )
);
