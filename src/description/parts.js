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
export const FACE_BEARD = 5;
export const FACE_EYEBROW = 6;
export const FACE_EYES = 7;
export const TEETH = 8;
export const HANDS_GENERAL = 9;
export const HANDS_NAILS = 10;
export const HANDS_HAIR = 11;

export const steps = () => {
  return [
    GENERAL,
    BODY,
    HAIR,
    FACE_GENERAL,
    FACE_BEARD,
    FACE_EYEBROW,
    FACE_EYES,
    TEETH,
    HANDS_GENERAL,
    HANDS_NAILS,
    HANDS_HAIR,
  ];
};

export const parts = (props) => {
  const steps = {
    [GENERAL]: <General key={GENERAL} {...props} />,
    [BODY]: <Body key={BODY} {...props} />,
    [HAIR]: <Hair key={HAIR} {...props} />,
    [FACE_GENERAL]: <FaceGeneral key={FACE_GENERAL} {...props} />,
    [FACE_BEARD]: <FaceBeard key={FACE_BEARD} {...props} />,
    [FACE_EYEBROW]: <FaceEyebrow key={FACE_EYEBROW} {...props} />,
    [FACE_EYES]: <FaceEye key={FACE_EYES} {...props} />,
    [TEETH]: <Teeth key={TEETH} {...props} />,
    [HANDS_GENERAL]: <HandsGeneral key={HANDS_GENERAL} {...props} />,
    [HANDS_NAILS]: <HandsNails key={HANDS_NAILS} {...props} />,
    [HANDS_HAIR]: <HandsHair key={HANDS_HAIR} {...props} />,
  };
  if (props.values['general.gender'] === 'woman') {
    delete steps[FACE_BEARD];
  }
  return steps;
};

parts.propTypes = {
  values: PropTypes.object.isRequired,
};
