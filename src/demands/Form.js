import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { parts } from './parts';

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
  return <Current {...props} steps={parts(props)} />;
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
