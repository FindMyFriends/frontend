import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import { steps } from './steps';
import { nextStep, previousStep } from './../stepFork';

const Current = ({
  step, label, onTurn, steps, ...rest
}) => {
  const last = step === Object.values(steps).length;
  return [
    steps[step.major].parts[step.minor].component,
    step.major === 1 && step.minor === 1
      ? <RaisedButton
        key="previous"
        onClick={() => {
          const { step: { major, minor } } = previousStep(step, steps);
          onTurn(major, minor);
        }}
        label="Previous"
        primary
      />
      : null,
    <RaisedButton
      key="next|submit"
      onClick={last ? rest.onSubmit : () => {
        const { step: { major, minor } } = nextStep(step, steps);
        onTurn(major, minor);
      }}
      label={last ? label : 'Next'}
      primary
    />,
  ];
};

const toTitle = part => ({
  title: part[1].title,
  position: part[0],
});

const Form = (props) => {
  const allSteps = steps(props);
  const majorTitles = Object.entries(allSteps).map(part => toTitle(part));
  const minorTitles = Object.entries(allSteps[props.step.major].parts).map(part => toTitle(part));
  return (
    <div>
      <MajorStepper {...props} majorTitles={majorTitles} steps={allSteps} />
      {minorTitles.length !== 1 ? <MinorStepper {...props} minorTitles={minorTitles} /> : null}
      <Current {...props} steps={allSteps} />
    </div>
  );
};

const MajorStepper = ({
  step, majorTitles, onTurn, steps,
}) => (
  <Stepper linear={false} activeStep={step.major - 1}>
    {majorTitles.map(entry => (
      <Step key={entry.position}>
        <StepButton
          onClick={() => onTurn(entry.position, Object.keys(steps[entry.position].parts)[0])}
        >
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
  steps: PropTypes.object.isRequired,
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
