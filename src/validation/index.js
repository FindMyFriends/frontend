// @flow
import * as emailValidator from 'email-validator';
import { flatten } from 'flat';
import { trim, inRange } from 'lodash';
import type { ApiRange } from '../api/enum';

export type Error = ?string;

const REQUIRED = 'REQUIRED';
const NOT_EMAIL = 'NOT_EMAIL';
const MIN_6_CHARS = 'MIN_6_CHARS';
const BIRTH_YEAR_OUT_OF_RANGE = 'BIRTH_YEAR_OUT_OF_RANGE';

export const required = (value: ?mixed) => (
  value === null || trim(value).length === 0 ? REQUIRED : null
);

export const email = (value: ?string) => {
  if (required(value)) return required(value);
  else if (!emailValidator.validate(value)) return NOT_EMAIL;
  return null;
};

export const password = (value: ?string) => {
  if (required(value)) return required(value);
  else if (trim(value).length < 6) return MIN_6_CHARS;
  return null;
};

export const birthYearRange = (value: ?number, birthYear: ApiRange) => {
  if (required(value)) return required(value);
  else if (!inRange(value, birthYear.minimum, birthYear.maximum)) return BIRTH_YEAR_OUT_OF_RANGE;
  return null;
};

export const toMessage = (error: string) => ({
  REQUIRED: 'Fill out this field',
  NOT_EMAIL: 'This is not valid email address',
  MIN_6_CHARS: 'Use at least 6 chars',
  BIRTH_YEAR_OUT_OF_RANGE: 'Range from 1850 to 2018',
}[error]);

export const anyErrors = (validations: Object): boolean => (
  Object.values(flatten(validations)).filter(validation => validation).length > 0
);
