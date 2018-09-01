// @flow
import React from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withFormStyles } from './withFormStyles';
import ColorInput from './ColorInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const Nails = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <ColorInput colors={selects.nailsColors} value={values['hands.nails.color_id']} onChange={onChange('hands.nails.color_id')}>
      Color
    </ColorInput>
    <FormControl className={classes.formControl}>
      <InputLabel>Length</InputLabel>
      <Select value={values['hands.nails.length_id'] || ''} onChange={onChange('hands.nails.length_id')}>
        {selects.nailsLegths.map(length => (
          <MenuItem key={length.id} value={length.id}>{length.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(Nails);
