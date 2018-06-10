// @flow
import React from 'react';
import steps from '../../description/input/parts/steps';
import MajorStepper from './MajorStepper';
import MinorStepper from './MinorStepper';
import { majorIdentifiers, minorIdentifiers } from './identifiers';
import Center from '../Center';

export default class NestedStepper extends React.Component {
  state = {
    major: 0,
    minor: 0,
  };

  handleMajorTurn = (major: number, minor: number) => this.setState({
    ...this.state,
    major,
    minor,
  });
  handleMinorTurn = (minor: number) => this.setState({ ...this.state, minor });

  render() {
    const { major, minor } = this.state;
    const allSteps = steps(this.props);
    return (
      <React.Fragment>
        <MajorStepper
          step={major}
          identifiers={majorIdentifiers(allSteps)}
          onTurn={this.handleMajorTurn}
        />
        <MinorStepper
          step={minor}
          identifiers={minorIdentifiers(allSteps, major)}
          onTurn={this.handleMinorTurn}
        />
        <Center>
          {allSteps[major].parts[minor].component}
        </Center>
      </React.Fragment>
    );
  }
}
