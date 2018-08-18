// @flow

import type { Age } from './types';

const isFilledAge = (age: Age): bool => age.from !== null && age.to !== null;

const isFilled = (value: ?mixed) => value !== null;

export const isValid = (description: Object): boolean => {
  return isFilledAge(description.general.age)
    && isFilled(description.general.gender)
    && isFilled(description.general.ethnic_group_id);
};
