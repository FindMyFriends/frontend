// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input/Input';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import { withFormStyles } from './withFormStyles';
import { toMessage } from '../../../validation';
import type { ApiRange } from '../../../api/enum';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: number,
  +classes: Object,
  +error: ?string,
  +birthYears: ?ApiRange,
|};
const BirthYearInput = ({
  classes,
  value,
  onChange,
  error,
  birthYears,
}: Props) => {
  return (
    <FormControl error={!!error} className={classes.formControl}>
      <InputLabel>Birth year</InputLabel>
      <Input type="number" inputProps={birthYears} onChange={onChange} value={value || ''} />
      {error && <FormHelperText id="name-error-text">{toMessage(error)}</FormHelperText>}
    </FormControl>
  );
};

export default withFormStyles()(BirthYearInput);
