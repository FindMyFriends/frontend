import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import { steps } from './../parts/steps';
import { nextStep, previousStep, isLastStep } from './../../stepFork';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
`;

const Side = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Current = ({ step, steps }) => (
  <UnifiedCurrent>{steps[step.major].parts[step.minor].component}</UnifiedCurrent>
);

const UnifiedCurrent = styled.div`
  width: 300px;
`;

const Navigation = ({
  step, children, onTurn, steps, ...rest
}) => {
  const last = isLastStep(step, steps);
  const style = {
    margin: '14px',
  };
  return (
    <Side>
      {
        step.major === 1 && step.minor === 1
          ? null
          : <RaisedButton
            style={style}
            key="previous"
            onClick={() => {
              const { step: { major, minor } } = previousStep(step, steps);
              onTurn(major, minor);
            }}
            label="Previous"
            primary
          />
      }
      <RaisedButton
        style={style}
        key="next|submit"
        onClick={last ? rest.onSubmit : () => {
          const { step: { major, minor } } = nextStep(step, steps);
          onTurn(major, minor);
        }}
        label={last ? children : 'Next'}
        primary
      />
    </Side>
  );
};

const Form = (props) => {
  const allSteps = steps(props);
  const majorTitles = Object.entries(allSteps).map(part => (
    { title: part[1].title, position: part[0] }
  ));
  const minorTitles = allSteps[props.step.major].parts.map((part, position) => (
    { title: part.title, position }
  ));
  return (
    <div>
      <MajorStepper {...props} majorTitles={majorTitles} />
      {minorTitles.length !== 1 ? <MinorStepper {...props} minorTitles={minorTitles} /> : null}
      <Center>
        <Current step={props.step} steps={allSteps} />
      </Center>
      <Navigation {...props} steps={allSteps} />
    </div>
  );
};

const MajorStepper = ({
  step, majorTitles, onTurn,
}) => (
  <Stepper linear={false} activeStep={step.major - 1}>
    {majorTitles.map(entry => (
      <Step key={entry.position}>
        <StepButton onClick={() => onTurn(entry.position, 0)}>
          {entry.title}
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

const MinorStepper = ({ minorTitles, step, onTurn }) => {
  return (
    <Stepper linear={false} activeStep={step.minor}>
      {minorTitles.map(entry => (
        <Step key={entry.position}>
          <StepButton onClick={() => onTurn(step.major, entry.position)}>
            {entry.title}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

MinorStepper.propTypes = {
  minorTitles: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
  onTurn: PropTypes.func.isRequired,
};

MajorStepper.propTypes = {
  majorTitles: PropTypes.array.isRequired,
  step: PropTypes.object.isRequired,
  onTurn: PropTypes.func.isRequired,
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired,
};

Navigation.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
  onTurn: PropTypes.func.isRequired,
};

Current.propTypes = {
  step: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
};

export default Form;
