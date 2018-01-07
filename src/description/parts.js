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

export const GENERAL = 1;
export const BODY = 2;
export const HAIR = 3;
export const FACE_GENERAL = 4;
export const BEARD = 5;
export const EYEBROW = 6;
export const EYES = 7;
export const TEETH = 8;
export const HANDS_GENERAL = 9;
export const HANDS_NAILS = 10;
export const HANDS_HAIR = 11;

export const MAIN_GENERAL = 1;
export const MAIN_BODY = 2;
export const MAIN_HEAD = 3;
export const MAIN_HANDS = 4;

export const titles = () => ({
  [GENERAL]: 'General',
  [BODY]: 'Body',
  [HAIR]: 'Hair',
  [FACE_GENERAL]: 'General info about face',
  [BEARD]: 'Beard',
  [EYEBROW]: 'Eyebrow',
  [EYES]: 'Eyes',
  [TEETH]: 'Teeth',
  [HANDS_GENERAL]: 'General info about hands',
  [HANDS_NAILS]: 'Nails',
  [HANDS_HAIR]: 'Hand hair',
});

export const steps = () => ({
  [MAIN_GENERAL]: {
    parts: [GENERAL],
    title: 'General',
  },
  [MAIN_BODY]: {
    parts: [BODY],
    title: 'Body',
  },
  [MAIN_HEAD]: {
    parts: [HAIR, FACE_GENERAL, BEARD, EYEBROW, EYES, TEETH],
    title: 'Head',
  },
  [MAIN_HANDS]: {
    parts: [HANDS_GENERAL, HANDS_NAILS, HANDS_HAIR],
    title: 'Hands',
  },
});

export const parts = (props) => {
  const steps = {
    [MAIN_GENERAL]: {
      [GENERAL]: <General key={GENERAL} {...props} />,
    },
    [MAIN_BODY]: {
      [BODY]: <Body key={BODY} {...props} />,
    },
    [MAIN_HEAD]: {
      [HAIR]: <Hair key={HAIR} {...props} />,
      [FACE_GENERAL]: <FaceGeneral key={FACE_GENERAL} {...props} />,
      [BEARD]: <FaceBeard key={BEARD} {...props} />,
      [EYEBROW]: <FaceEyebrow key={EYEBROW} {...props} />,
      [EYES]: <FaceEye key={EYES} {...props} />,
      [TEETH]: <Teeth key={TEETH} {...props} />,
    },
    [MAIN_HANDS]: {
      [HANDS_GENERAL]: <HandsGeneral key={HANDS_GENERAL} {...props} />,
      [HANDS_NAILS]: <HandsNails key={HANDS_NAILS} {...props} />,
      [HANDS_HAIR]: <HandsHair key={HANDS_HAIR} {...props} />,
    },
  };
  if (props.values['general.gender'] === 'woman') {
    delete steps[MAIN_HEAD][BEARD];
  }
  return steps;
};

parts.propTypes = {
  values: PropTypes.object.isRequired,
};
