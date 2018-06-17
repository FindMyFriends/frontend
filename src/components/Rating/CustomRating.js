// @flow
import React from 'react';
import 'react-rater/lib/react-rater.css';
import { BigDot, SmallDot, BIG } from './Dot';
import { EmptyBigDot, EmptySmallDot } from './EmptyDot';
import { ClickableBigDot, ClickableSmallDot } from './ClickableDot';

type Props = {|
  willBeActive?: boolean,
  isActive?: boolean,
  size: 'big' | 'small',
|};
const CustomRating = ({ willBeActive, isActive, size }: Props) => {
  if (isActive) {
    return (size === BIG ? <BigDot /> : <SmallDot />);
  } else if (willBeActive) {
    return (size === BIG ? <ClickableBigDot /> : <ClickableSmallDot />);
  }
  return (size === BIG ? <EmptyBigDot /> : <EmptySmallDot />);
};

export default CustomRating;
