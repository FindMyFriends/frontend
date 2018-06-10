// @flow
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import type { Entry } from './identifiers';

type Props = {|
  +step: number,
  +identifiers: Array<Entry>,
  +onTurn: (number) => (void),
|};
export default class MinorStepper extends React.PureComponent<Props> {
  render() {
    const { identifiers, step, onTurn } = this.props;
    return (
      <Stepper nonLinear activeStep={step}>
        {identifiers.map(entry => (
          <Step key={entry.position}>
            <StepButton
              onClick={() => onTurn(entry.position)}
              completed={false}
            >
              {entry.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    );
  }
}