// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: mixed,
  +classes: Object,
  +children: string
|};
const MassInput = ({
  classes,
  onChange,
  value,
  children,
}: Props) => (
  <FormControl className={classes.formControl}>
    <InputLabel>{children}</InputLabel>
    <Input
      type="number"
      onChange={onChange}
      value={value || ''}
      endAdornment={<InputAdornment>Kg</InputAdornment>}
    />
  </FormControl>
);

export default withFormStyles()(MassInput);
