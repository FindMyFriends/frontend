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

const GENERAL = 1;

const BODY = 1;

const HAIR = 1;
const FACE_GENERAL = 2;
const BEARD = 3;
const EYEBROW = 4;
const EYES = 5;
const TEETH = 6;

const HANDS_GENERAL = 1;
const HANDS_NAILS = 2;
const HANDS_HAIR = 3;

export const steps = (props) => {
  const MAIN_GENERAL = 1;
  const MAIN_BODY = 2;
  const MAIN_HEAD = 3;
  const MAIN_HANDS = 4;
  const steps = {
    [MAIN_GENERAL]: {
      title: 'General',
      parts: {
        [GENERAL]: {
          component: <General key={GENERAL} {...props} />,
          title: 'General',
        },
      },
    },
    [MAIN_BODY]: {
      title: 'Body',
      parts: {
        [BODY]: {
          component: <Body key={BODY} {...props} />,
          title: 'Body',
        },
      },
    },
    [MAIN_HEAD]: {
      title: 'Head',
      parts: {
        [HAIR]: {
          component: <Hair key={HAIR} {...props} />,
          title: 'Hair',
        },
        [FACE_GENERAL]: {
          component: <FaceGeneral key={FACE_GENERAL} {...props} />,
          title: 'General info about face',
        },
        [BEARD]: {
          component: <FaceBeard key={BEARD} {...props} />,
          title: 'Beard',
        },
        [EYEBROW]: {
          component: <FaceEyebrow key={EYEBROW} {...props} />,
          title: 'Eyebrow',
        },
        [EYES]: {
          component: <FaceEye key={EYES} {...props} />,
          title: 'Eyes',
        },
        [TEETH]: {
          component: <Teeth key={TEETH} {...props} />,
          title: 'Teeth',
        },
      },
    },
    [MAIN_HANDS]: {
      title: 'Hands',
      parts: {
        [HANDS_GENERAL]: {
          component: <HandsGeneral key={HANDS_GENERAL} {...props} />,
          title: 'General info about hands',
        },
        [HANDS_NAILS]: {
          component: <HandsNails key={HANDS_NAILS} {...props} />,
          title: 'Nails',
        },
        [HANDS_HAIR]: {
          component: <HandsHair key={HANDS_HAIR} {...props} />,
          title: 'Hand hair',
        },
      },
    },
  };
  if (props.values['general.gender'] === 'woman') {
    delete steps[MAIN_HEAD].parts[BEARD];
  }
  return steps;
};

steps.propTypes = {
  values: PropTypes.object.isRequired,
};
