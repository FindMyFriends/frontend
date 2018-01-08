import React from 'react';
import Location from './Location';
import { steps as descriptionSteps } from './../description/steps';

const LOCATION = 1;

export const steps = (props) => {
  const LAST_STEP = Object.keys(descriptionSteps(props)).length;
  const MAIN_LOCATION = LAST_STEP + 1;
  return {
    ...descriptionSteps(props),
    [MAIN_LOCATION]: {
      title: 'Location',
      parts: {
        [LOCATION]: {
          component: <Location key={LOCATION} {...props} />,
          title: 'Location',
        },
      },
    },
  };
};
