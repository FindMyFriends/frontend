// @flow
import type { Age } from './types';

export const formattedAge = (age: Age): string => `${age.from} - ${age.to}`;
