// @flow
import React from 'react';
import AddButton from './AddButton';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import { isLast, isFirst } from './moves';
import type { Step } from './moves';

type Props = {|
  +step: Step,
  +steps: Object,
  +onAdd: () => (void),
  +onNext: () => (void),
  +onPrevious: () => (void),
|};
const ControlButtons = ({
  step,
  steps,
  onAdd,
  onNext,
  onPrevious,
}: Props) => {
  const nextButtons = () => {
    if (isLast(step, steps)) {
      return <AddButton key={1} onClick={onAdd}>Add</AddButton>;
    }
    return <NextButton key={2} onClick={onNext}>Next</NextButton>;
  };

  const previousButtons = () => {
    if (!isFirst(step)) {
      return <PreviousButton key={3} onClick={onPrevious}>Previous</PreviousButton>;
    }
    return null;
  };

  return [
    nextButtons(),
    previousButtons(),
  ];
};

export default ControlButtons;
