// @flow
import React from 'react';
import { default as descriptionSteps, MAIN_GENERAL } from '../../../description/input/parts/steps';
import Spot from '../../../spot/input/parts/Spot';
import General from '../../../description/input/parts/General';

// TODO: Move - common with demands
const lastStep = (parts: Object) => (
  Math.max(...Object.keys(parts).map(number => parseInt(number, 10)))
);

const steps = (props: Object): Object => {
  const descriptionParts = descriptionSteps(props);
  const LAST_DESCRIPTION_PART = lastStep(descriptionParts);
  const MAIN_SPOT = LAST_DESCRIPTION_PART + 1;

  return {
    ...descriptionSteps(props),
    [MAIN_GENERAL]: {
      title: 'General',
      parts: [
        {
          component: <General {...props} ignores={['age']} />,
          title: 'General',
        },
      ],
    },
    [MAIN_SPOT]: {
      title: 'Spot',
      parts: [
        {
          component: <Spot {...props} />,
          title: 'Met at',
        },
      ],
    },
  };
};

export default steps;
