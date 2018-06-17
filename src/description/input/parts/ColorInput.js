// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from './withFormStyles';
import type { ApiColor } from '../../../api/enum';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +value: string,
  +colors: Array<ApiColor>,
  +classes: Object,
  +children: string,
|};
const ColorInput = ({
  onChange,
  value,
  colors,
  classes,
  children,
}: Props) => (
  <FormControl className={classes.formControl}>
    <InputLabel>{children}</InputLabel>
    <Select value={value || ''} onChange={onChange}>
      {colors.map(color => <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>)}
    </Select>
  </FormControl>
);

export default withFormStyles()(ColorInput);
