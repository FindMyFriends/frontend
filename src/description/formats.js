// @flow
import type { Age, UnitValue } from './types';

export const formattedUnitValue = (unitValue: UnitValue): string => `${unitValue.value || ''} ${unitValue.unit || ''}`;
export const formattedAge = (age: Age): string => `${age.from} - ${age.to}`;
