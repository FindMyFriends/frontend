// @flow
import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import CustomRating from './CustomRating';
import { SMALL } from './Dot';

type Props = {|
  +max: number,
  +current: number,
|};
const OutputRating = ({ max, current }: Props) => (
  <Rater
    total={max}
    rating={current}
    interactive={false}
  >
    <CustomRating size={SMALL} />
  </Rater>
);

export default OutputRating;
