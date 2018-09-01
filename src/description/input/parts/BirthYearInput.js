// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input/Input';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import { withFormStyles } from './withFormStyles';
import { toMessage } from '../../../validation';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: number,
  +classes: Object,
  +error: ?string,
|};
const BirthYearInput = ({
  classes,
  value,
  onChange,
  error,
}: Props) => {
  return (
    <FormControl error={!!error} className={classes.formControl}>
      <InputLabel>Birth year</InputLabel>
      <Input type="number" inputProps={{ min: 1850, max: 2018 }} onChange={onChange} value={value || ''} />
      {error && <FormHelperText id="name-error-text">{toMessage(error)}</FormHelperText>}
    </FormControl>
  );
};

export default withFormStyles()(BirthYearInput);
