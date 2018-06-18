// @flow
import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import CustomRating from './CustomRating';
import { onRating } from './events';
import { BIG } from './Dot';

const styles = {
  label: {
    paddingBottom: '8px',
  },
};

type Props = {|
  +current: number,
  +onChange: (Object) => (mixed),
  +children: string,
  +classes: Object,
|};
const InputRating = ({
  current,
  onChange,
  children,
  classes,
}: Props) => (
  <React.Fragment>
    <FormLabel className={classes.label}>{children}</FormLabel>
    <Rater
      total={10}
      rating={current}
      onRate={event => onRating(onChange, event)}
    >
      <CustomRating size={BIG} />
    </Rater>
  </React.Fragment>
);

export default withStyles(styles)(InputRating);
