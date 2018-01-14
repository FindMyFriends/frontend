import React from 'react';
import Location from './Location';
import { steps as descriptionSteps } from './../description/steps';

export const steps = (props) => {
  const previousSteps = descriptionSteps(props);
  const LAST_STEP = Object.keys(previousSteps).length;
  const MAIN_LOCATION = LAST_STEP + 1;
  return {
    ...previousSteps,
    [MAIN_LOCATION]: {
      title: 'Location',
      parts: [
        {
          component: <Location key={0} {...props} />,
          title: 'Location',
        },
      ],
    },
  };
};
