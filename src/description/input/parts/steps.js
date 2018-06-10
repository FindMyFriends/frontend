// @flow
import React from 'react';
import General from './General';

const reindex = parts => parts.filter(part => part);

export const MAIN_GENERAL = 0;
export const MAIN_BODY = 1;
export const MAIN_HEAD = 2;
export const MAIN_HANDS = 3;

export const steps = (props, parts = {}) => {
  const steps = {
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
          component: <span key={0} {...props}>Body..</span>,
          title: 'Body',
        },
      ],
    },
    ...parts,
  };
  return steps;
};

export default steps;
