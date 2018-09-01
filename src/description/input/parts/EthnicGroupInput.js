// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import { toMessage } from '../../../validation';

type Props = {|
  +onChange: (Object) => (void),
  +value: ?number | ?string,
  +selects: Object,
  +classes: Object,
  +error?: ?string,
|};
const EthnicGroupInput = ({
  onChange,
  value,
  selects,
  classes,
  error,
}: Props) => (
  <FormControl error={!!error} className={classes.formControl}>
    <InputLabel>Ethnic group</InputLabel>
    <Select value={value || ''} onChange={onChange}>
      {selects.map(ethnicGroup => (
        <MenuItem key={ethnicGroup.id} value={ethnicGroup.id}>
          {ethnicGroup.name}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText id="name-error-text">{toMessage(error)}</FormHelperText>}
  </FormControl>
);

export default EthnicGroupInput;
