// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: ?string,
  +selects: Object,
  +classes: Object,
|};
const EthnicGroupInput = ({
  onChange,
  value,
  selects,
  classes,
}: Props) => (
  <FormControl className={classes.formControl}>
    <InputLabel>Ethnic group</InputLabel>
    <Select value={value || ''} onChange={onChange('general.ethnic_group_id')}>
      {selects.map(ethnicGroup => (
        <MenuItem key={ethnicGroup.id} value={ethnicGroup.id}>
          {ethnicGroup.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default EthnicGroupInput;
