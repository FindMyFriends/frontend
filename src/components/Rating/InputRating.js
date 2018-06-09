// @flow
import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import CustomRating from './CustomRating';
import { onRating } from './events';

type Props = {|
  +max: number,
  +current: number,
  +name: string,
  +onChange: (Object) => (mixed),
  +children: string,
|};
const InputRating = ({
  max,
  current,
  name,
  onChange,
  children,
}: Props) => (
  <React.Fragment>
    {children} {/* Should be label */}
    <br />
    <Rater
      total={max}
      rating={current}
      onRate={event => onRating(onChange, name, event)}
    >
      <CustomRating />
    </Rater>
  </React.Fragment>
);

export default InputRating;
