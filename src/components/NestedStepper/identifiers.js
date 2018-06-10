// @flow
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';

export const majorIdentifiers = (steps: Array<Object>): Array<Object> => (
  values(mapValues(steps, (part, position) => ({
    title: part.title,
    position: parseInt(position, 10),
  })))
);

export const minorIdentifiers = (steps: Array<Object>, major: number): Array<Object> => (
  steps[major].parts.map((part, position) => ({
    title: part.title,
    position: parseInt(position, 10),
  }))
);
