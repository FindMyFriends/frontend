// @flow
import React from 'react';
import 'react-rater/lib/react-rater.css';
import Dot from './Dot';
import EmptyDot from './EmptyDot';
import ClickableDot from './ClickableDot';

type Props = {|
  willBeActive?: boolean,
  isActive?: boolean,
|};
const CustomRating = ({ willBeActive, isActive }: Props) => {
  if (isActive) {
    return <Dot />;
  } else if (willBeActive) {
    return <ClickableDot />;
  }
  return <EmptyDot />;
};

export default CustomRating;
