// @flow
import React from 'react';
import MajorStepper from './MajorStepper';
import MinorStepper from './MinorStepper';
import { majorIdentifiers, minorIdentifiers } from './identifiers';
import Center from '../Center';

type Props = {|
  +steps: Object,
|};
type State = {|
  major: number,
  minor: number,
|};
export default class NestedStepper extends React.Component<Props, State> {
  state = {
    major: 2,
    minor: 1,
  };

  handleMajorTurn = (major: number, minor: number) => this.setState({
    ...this.state,
    major,
    minor,
  });
  handleMinorTurn = (minor: number) => this.setState({ ...this.state, minor });

  render() {
    const { major, minor } = this.state;
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
