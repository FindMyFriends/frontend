// @flow
import React from 'react';
import MetAt from './MetAt';
import { default as descriptionSteps } from '../../../description/input/parts/steps';

const steps = (props: Object): Object => {
  const descriptionParts = descriptionSteps(props);
  const LAST_DESCRIPTION_PART = Math.max(...Object.keys(descriptionParts));
  const MAIN_LOCATION = LAST_DESCRIPTION_PART + 1;

  return {
    [MAIN_LOCATION]: {
      title: 'Location',
      parts: [
        {
          component: <MetAt {...props} />,
          title: 'Met at',
        },
      ],
    },
    ...descriptionParts,
  };
};

export default steps;
