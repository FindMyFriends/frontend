import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import { parts, titles, steps } from './parts';

const Current = ({
  step, label, onTurn, parts, ...rest
}) => {
  const last = step === Object.values(parts).length;
  return [
    parts[step.major][step.minor],
    step === 1 || <RaisedButton key="previous" onClick={() => onTurn(step - 1)} label="Previous" primary />,
    <RaisedButton key="next|submit" onClick={last ? rest.onSubmit : () => onTurn(step + 1)} label={last ? label : 'Next'} primary />,
  ];
};

const Form = (props) => {
  const majorTitles = Object.entries(steps()).map(part => ({
    title: part[1].title,
    position: part[0],
  }));
  const minorTitles = steps()[props.step.major].parts.map(part => ({
    title: titles()[part],
    position: part,
  }));
  return (
    <div>
      <MajorStepper {...props} majorTitles={majorTitles} minorTitles={minorTitles} />
      {minorTitles.length !== 1 ? <MinorStepper {...props} minorTitles={minorTitles} /> : null}
      <Current {...props} parts={parts(props)} />
    </div>
  );
};

const MajorStepper = ({
  step, majorTitles, minorTitles, onTurn,
}) => (
  <Stepper linear={false} activeStep={step.major - 1}>
    {majorTitles.map(entry => (
      <Step key={entry.position}>
        <StepButton onClick={() => onTurn(entry.position, minorTitles[0].position)}>
          {entry.title}
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

const MinorStepper = ({ minorTitles, step, onTurn }) => (
  <Stepper linear={false} activeStep={step.minor - minorTitles[0].position}>
    {minorTitles.map(entry => (
      <Step key={entry.position}>
        <StepButton onClick={() => onTurn(step.major, entry.position)}>
          {entry.title}
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

MinorStepper.propTypes = {
  minorTitles: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
  onTurn: PropTypes.func.isRequired,
};

MajorStepper.propTypes = {
  majorTitles: PropTypes.array.isRequired,
  minorTitles: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
  onTurn: PropTypes.func.isRequired,
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired,
};

export default Form;
