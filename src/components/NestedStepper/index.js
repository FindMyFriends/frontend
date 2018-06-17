// @flow
import React from 'react';
import MajorStepper from './MajorStepper';
import MinorStepper from './MinorStepper';
import { majorIdentifiers, minorIdentifiers } from './identifiers';
import type { Step } from './moves';
import Center from '../Center';

type Props = {|
  +steps: Object,
|};
type State = {|
  step: Step,
|};
export default class NestedStepper extends React.Component<Props, State> {
  state = {
    step: {
      major: 2,
      minor: 1,
    },
  };

  handleMajorTurn = (major: number, minor: number) => this.setState({
    step: {
      major,
      minor,
    },
  });
  handleMinorTurn = (minor: number) => (
    this.setState({
      step: {
        ...this.state.step,
        minor,
      },
    })
  );

  render() {
    const { step: { major, minor } } = this.state;
    const { steps } = this.props;
    return (
      <React.Fragment>
        <MajorStepper
          step={major}
          identifiers={majorIdentifiers(steps)}
          onTurn={this.handleMajorTurn}
        />
        <MinorStepper
          step={minor}
          identifiers={minorIdentifiers(steps, major)}
          onTurn={this.handleMinorTurn}
        />
        <Center>
          {steps[major].parts[minor].component}
        </Center>
      </React.Fragment>
    );
  }
}
