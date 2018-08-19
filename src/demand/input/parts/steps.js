// @flow
import React from 'react';
import Spot from '../../../spot/input/parts/Spot';
import { default as descriptionSteps } from '../../../description/input/parts/steps';

const lastStep = (parts: Object) => (
  Math.max(...Object.keys(parts).map(number => parseInt(number, 10)))
);

const steps = (props: Object): Object => {
  const descriptionParts = descriptionSteps(props);
  const LAST_DESCRIPTION_PART = lastStep(descriptionParts);
  const MAIN_SPOT = LAST_DESCRIPTION_PART + 1;

  return {
    [MAIN_SPOT]: {
      title: 'Spot',
      parts: [
        {
          component: <Spot {...props} />,
          title: 'Met at',
        },
      ],
    },
    ...descriptionParts,
  };
};

export default steps;
