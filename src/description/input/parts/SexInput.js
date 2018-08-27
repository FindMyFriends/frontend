// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Props = {|
  +onChange: (Object) => (void),
  +value: ?string,
  +selects: Object,
  +classes: Object,
|};
const SexInput = ({
  onChange,
  value,
  selects,
  classes,
}: Props) => (
  <FormControl className={classes.formControl}>
    <InputLabel>Sex</InputLabel>
    <Select value={value || ''} onChange={onChange}>
      {selects.map(sex => <MenuItem key={sex} value={sex}>{sex}</MenuItem>)}
    </Select>
  </FormControl>
);

export default SexInput;
