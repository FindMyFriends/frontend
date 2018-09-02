// @flow
import React from 'react';
import Spots from '../../../spot/input/parts/Spots';
import { default as descriptionSteps } from '../../../description/input/parts/steps';
import { lastStep } from '../../../components/NestedStepper/moves';

const steps = (props: Object): Object => {
  const descriptionParts = descriptionSteps(props);
  const LAST_DESCRIPTION_PART = lastStep(descriptionParts);
  const MAIN_SPOTS = LAST_DESCRIPTION_PART + 1;

  return {
    [MAIN_SPOTS]: {
      title: 'Spots',
      parts: [
        {
          component: <Spots {...props} />,
          title: 'Location and time',
        },
      ],
    },
    ...descriptionParts,
  };
};

export default steps;
