// @flow
import React from 'react';
import MajorStepper from './MajorStepper';
import MinorStepper from './MinorStepper';
import { majorIdentifiers, minorIdentifiers } from './identifiers';
import ControlButtons from './ControlButtons';
import { next, previous } from './moves';
import type { Step } from './moves';
import Center from '../Center';

type Props = {|
  +steps: Object,
  +onAdd: () => (void),
  +valid?: boolean,
|};
type State = {|
  step: Step,
|};
export default class NestedStepper extends React.Component<Props, State> {
  state = {
    step: {
      major: 0,
      minor: 0,
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

  handleNextTurn = () => (
    this.setState({
      step: next(this.state.step, this.props.steps),
    })
  );

  handlePreviousTurn = () => (
    this.setState({
      step: previous(this.state.step, this.props.steps),
    })
  );

  render() {
    const { step: { major, minor } } = this.state;
    const { steps, onAdd, valid = true } = this.props;
    return (
      <React.Fragment>
        <MajorStepper
          disabled={!valid}
          step={major}
          identifiers={majorIdentifiers(steps)}
          onTurn={this.handleMajorTurn}
        />
        <MinorStepper
          disabled={!valid}
          step={minor}
          identifiers={minorIdentifiers(steps, major)}
          onTurn={this.handleMinorTurn}
        />
        <Center>
          {steps[major].parts[minor].component}
        </Center>
        <ControlButtons
          disabled={!valid}
          step={this.state.step}
          steps={steps}
          onAdd={onAdd}
          onNext={this.handleNextTurn}
          onPrevious={this.handlePreviousTurn}
        />
      </React.Fragment>
    );
  }
}
