// @flow
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';

export type Entry = {|
  +title: string,
  +position: number,
|};

export const majorIdentifiers = (steps: Object): Array<Entry> => (
  values(mapValues(steps, (part, position) => ({
    title: part.title,
    position: parseInt(position, 10),
  })))
);

export const minorIdentifiers = (steps: Object, major: number): Array<Entry> => (
  steps[major].parts.map((part, position) => ({
    title: part.title,
    position: parseInt(position, 10),
  }))
);
