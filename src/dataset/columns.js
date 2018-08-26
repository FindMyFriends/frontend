// @flow
import { mapValues } from 'lodash';

const columnWithIdentifiers = {
  'general.firstname': 'Firstname',
  'general.lastname': 'Lastname',
  'general.sex': 'Sex',
};

export const translation = (field: string): string => columnWithIdentifiers[field];

export const translations = (columns: Object): Object =>
  mapValues(columns, (count, identifier) => translation(identifier));

export const dotsToValue = (column: string, source: Object): Object => column.split('.').reduce((object, key) => object[key], source);
