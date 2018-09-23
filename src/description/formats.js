// @flow
import type { Age } from './types';

export const formattedRangeAge = (age: Age|string): ?string => (
  typeof age.from === 'number' && typeof age.to === 'number'
    ? `${age.from} - ${age.to}`
    : null
);

export const formattedAge = (age: Age|string): ?string => (
  typeof age === 'string' ? age : null
);
