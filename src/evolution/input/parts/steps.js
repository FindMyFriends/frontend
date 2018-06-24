// @flow
import React from 'react';
import { default as descriptionSteps, MAIN_GENERAL } from '../../../description/input/parts/steps';
import General from '../../../description/input/parts/General';

const steps = (props: Object): Object => {
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
  };
};

export default steps;
