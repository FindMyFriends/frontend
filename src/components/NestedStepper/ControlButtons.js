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
  +disabled: boolean,
|};
const ControlButtons = ({
  step,
  steps,
  onAdd,
  onNext,
  onPrevious,
  disabled,
}: Props) => {
  const nextButtons = () => {
    if (isLast(step, steps)) {
      return <AddButton disabled={disabled} key={1} onClick={onAdd}>Add</AddButton>;
    }
    return <NextButton disabled={disabled} key={2} onClick={onNext}>Next</NextButton>;
  };

  const previousButtons = () => {
    if (!isFirst(step)) {
      return (
        <PreviousButton disabled={disabled} key={3} onClick={onPrevious}>
          Previous
        </PreviousButton>
      );
    }
    return null;
  };

  return [
    nextButtons(),
    previousButtons(),
  ];
};

export default ControlButtons;
