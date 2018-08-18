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
  +disabled: boolean,
|};
export default class MinorStepper extends React.PureComponent<Props> {
  render() {
    const {
      identifiers,
      step,
      onTurn,
      disabled,
    } = this.props;
    return (
      <Stepper nonLinear activeStep={step}>
        {identifiers.map(entry => (
          <Step key={entry.position}>
            <StepButton disabled={disabled} onClick={() => onTurn(entry.position)}>
              {entry.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    );
  }
}
