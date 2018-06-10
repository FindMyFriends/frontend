// @flow
import React from 'react';
import General from './General';
import Body from './Body';
import Hair from './Hair';
import { default as GeneralFace } from './Face/General';

export const MAIN_GENERAL = 0;
export const MAIN_BODY = 1;
export const MAIN_HEAD = 2;

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
    [MAIN_BODY]: {
      title: 'Body',
      parts: [
        {
          component: <Body {...props} />,
          title: 'General',
        },
      ],
    },
    [MAIN_HEAD]: {
      title: 'Head',
      parts: [
        {
          component: <Hair {...props} />,
          title: 'Hair',
        },
        {
          component: <GeneralFace {...props} />,
          title: 'General info about face',
        },
      ],
    },
    ...parts,
  };
};

export default steps;
