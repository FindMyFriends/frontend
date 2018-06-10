// @flow
import React from 'react';
import General from './General';
import Body from './Body';
import Hair from './Hair';
import { default as GeneralFace } from './Face/General';
import Beard from './Beard';
import Eyebrow from './Eyebrow';
import Eyes from './Eyes';
import Teeth from './Teeth';

const reindex = (values: Array<mixed>) => values.filter(value => value);

export const MAIN_GENERAL = 0;
export const MAIN_BODY = 1;
export const MAIN_HEAD = 2;

export const steps = (props: Object, parts?: Object = {}): Object => {
  const all = {
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
        {
          component: <Beard {...props} />,
          title: 'Beard',
        },
        {
          component: <Eyebrow {...props} />,
          title: 'Eyebrow',
        },
        {
          component: <Eyes {...props} />,
          title: 'Eyes',
        },
        {
          component: <Teeth {...props} />,
          title: 'Teeth',
        },
      ],
    },
    ...parts,
  };
  if (props.values['general.sex'] === 'woman') {
    delete all[MAIN_HEAD].parts[2];
    all[MAIN_HEAD].parts = reindex(all[MAIN_HEAD].parts);
  }
  return all;
};

export default steps;
