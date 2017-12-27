import React from 'react';
import Location from './Location';
import { parts as descriptionParts, steps as descriptionSteps } from './../description/parts';

const LAST_STEP = descriptionSteps().length;
const LOCATION = LAST_STEP + 1;

export const steps = () => {
  return [
    LOCATION,
  ];
};


export const parts = (props) => {
  return {
    [LOCATION]: <Location key={LOCATION} {...props} />,
    ...descriptionParts(props),
  };
};
