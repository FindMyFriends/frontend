// @flow
import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import FormLabel from '@material-ui/core/FormLabel';
import CustomRating from './CustomRating';
import { onRating } from './events';

type Props = {|
  +current: number,
  +onChange: (Object) => (mixed),
  +children: string,
|};
const InputRating = ({
  current,
  onChange,
  children,
}: Props) => (
  <React.Fragment>
    <FormLabel>{children}</FormLabel>
    <Rater
      total={10}
      rating={current}
      onRate={event => onRating(onChange, event)}
    >
      <CustomRating />
    </Rater>
  </React.Fragment>
);

export default InputRating;
