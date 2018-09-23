// @flow
import type { Age } from './types';

const isFilledAgeRange = (age: Age): bool => age.from !== null && age.to !== null;
const isFilled = (value: ?mixed) => value !== null;

export const isValid = (description: Object): boolean => {
  return isFilledAgeRange(description.general.age)
    && isFilled(description.general.gender)
    && isFilled(description.general.ethnic_group_id);
};
