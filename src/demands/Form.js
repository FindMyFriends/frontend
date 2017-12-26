import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import General from './../description/General';
import Body from './../description/Body';
import Hair from './../description/Hair';
import FaceGeneral from './../description/Face/General';
import FaceEyebrow from './../description/Face/Eyebrow';
import FaceEye from './../description/Face/Eye';
import FaceBeard from './../description/Face/Beard';
import Teeth from './../description/Face/Teeth';
import HandsGeneral from './../description/Hands/General';
import HandsNails from './../description/Hands/Nails';
import HandsHair from './../description/Hands/Hair';

const GENERAL = 1;
const BODY = 2;
const HAIR = 3;
const FACE_GENERAL = 4;
const FACE_BEARD = 5;
const FACE_EYEBROW = 6;
const FACE_EYES = 7;
const TEETH = 8;
const HANDS_GENERAL = 9;
const HANDS_NAILS = 10;
const HANDS_HAIR = 11;

const Current = ({
  step, label, onTurn, steps, ...rest
}) => {
  const last = step === Object.values(steps).length;
  const first = step === 1;
  return [
    steps[step],
    first || <RaisedButton key="previous" onClick={() => onTurn(-1)} label="Previous" primary />,
    <RaisedButton key="next|submit" onClick={last ? rest.onSubmit : () => onTurn(+1)} label={last ? label : 'Next'} primary />,
  ];
};

const Form = (props) => {
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
  return <Current {...props} steps={steps} />;
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
