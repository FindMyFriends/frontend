import React from 'react';
import PropTypes from 'prop-types';
import General from './General';
import Body from './Body';
import Hair from './Hair';
import FaceGeneral from './Face/General';
import FaceEyebrow from './Face/Eyebrow';
import FaceEye from './Face/Eye';
import FaceBeard from './Face/Beard';
import Teeth from './Face/Teeth';
import HandsGeneral from './Hands/General';
import HandsNails from './Hands/Nails';
import HandsHair from './Hands/Hair';

const reindex = parts => parts.filter(part => part);

export const steps = (props) => {
  const MAIN_GENERAL = 1;
  const MAIN_BODY = 2;
  const MAIN_HEAD = 3;
  const MAIN_HANDS = 4;
  const steps = {
    [MAIN_GENERAL]: {
      title: 'General',
      parts: [
        {
          component: <General key={0} {...props} />,
          title: 'General',
        },
      ],
    },
    [MAIN_BODY]: {
      title: 'Body',
      parts: [
        {
          component: <Body key={0} {...props} />,
          title: 'Body',
        },
      ],
    },
    [MAIN_HEAD]: {
      title: 'Head',
      parts: [
        {
          component: <Hair key={0} {...props} />,
          title: 'Hair',
        },
        {
          component: <FaceGeneral key={1} {...props} />,
          title: 'General info about face',
        },
        {
          component: <FaceBeard key={2} {...props} />,
          title: 'Beard',
        },
        {
          component: <FaceEyebrow key={3} {...props} />,
          title: 'Eyebrow',
        },
        {
          component: <FaceEye key={4} {...props} />,
          title: 'Eyes',
        },
        {
          component: <Teeth key={5} {...props} />,
          title: 'Teeth',
        },
      ],
    },
    [MAIN_HANDS]: {
      title: 'Hands',
      parts: [
        {
          component: <HandsGeneral key={0} {...props} />,
          title: 'General info about hands',
        },
        {
          component: <HandsNails key={1} {...props} />,
          title: 'Nails',
        },
        {
          component: <HandsHair key={2} {...props} />,
          title: 'Hand hair',
        },
      ],
    },
  };
  if (props.values['general.sex'] === 'woman') {
    delete steps[MAIN_HEAD].parts[2];
    steps[MAIN_HEAD].parts = reindex(steps[MAIN_HEAD].parts);
  }
  return steps;
};

steps.propTypes = {
  values: PropTypes.object.isRequired,
};
