import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import General from './../description/General.js';
import Body from './../description/Body.js';
import Hair from './../description/Hair.js';
import FaceGeneral from './../description/Face/General.js';
import FaceEyebrow from './../description/Face/Eyebrow.js';
import FaceEye from './../description/Face/Eye.js';
import FaceBeard from './../description/Face/Beard.js';
import Teeth from './../description/Face/Teeth.js';
import HandsGeneral from './../description/Hands/General.js';

const GENERAL = 1,
  BODY = 2,
  HAIR = 3,
  FACE_GENERAL = 4,
  FACE_BEARD = 5,
  FACE_EYEBROW = 6,
  FACE_EYES = 7,
  TEETH = 8,
  HANDS_GENERAL = 9;

const Current = ({ step, label, onTurn, steps, ...rest }) => {
  const last = step === Math.max(Object.keys(steps)),
    first = step === 1;
  return [
    steps[step],
    first || <RaisedButton key="previous" onClick={() => onTurn(-1)} label="Previous" primary />,
    <RaisedButton key="next|submit" onClick={last ? rest.onSubmit : () => onTurn(+1)} label={last ? label : 'Next'} primary />
  ];
};

const Form = props => {
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
  };
  if (props.values['general.gender'] === 'woman') {
    delete steps[FACE_BEARD];
  }
  return <Current {...props} steps={steps} />
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
