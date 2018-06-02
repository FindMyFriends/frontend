// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';

export const twoSideSort = (current: Object, added: Object): Object => {
  if (isEqual(Object.keys(current), Object.keys(added))) {
    const criteria = Object.keys(added)[0];
    const operator = current[criteria][0] === '+' ? '-' : '+';
    return { [criteria]: operator + criteria };
  }
  return mapValues(added, criteria => `+${criteria}`);
};