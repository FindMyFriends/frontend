// @flow
import React from 'react';
import General from './General';

export const MAIN_GENERAL = 0;

export const steps = (props: Object, parts?: Object = {}): Object => {
  return {
    [MAIN_GENERAL]: {
      title: 'General',
      parts: [
        {
          component: <General {...props} />,
          title: 'General',
        },
      ],
    },
    ...parts,
  };
};

export default steps;
