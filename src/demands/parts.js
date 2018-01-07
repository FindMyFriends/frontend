import React from 'react';
import Location from './Location';
import {
  parts as descriptionParts,
  steps as descriptionSteps,
  titles as descriptionTitles,
} from './../description/parts';

const LAST_STEP = Object.keys(descriptionSteps()).length;
export const MAIN_LOCATION = LAST_STEP + 1;
export const LOCATION = 1;

export const steps = () => ({
  [MAIN_LOCATION]: {
    parts: [LOCATION],
    title: 'Location',
  },
  ...descriptionSteps(),
});

export const titles = () => ({
  [MAIN_LOCATION]: 'Location',
  ...descriptionTitles(),
});

export const parts = props => ({
  [MAIN_LOCATION]: {
    [LOCATION]: <Location key={LOCATION} {...props} />,
  },
  ...descriptionParts(props),
});
