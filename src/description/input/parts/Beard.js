// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LengthInput from './LengthInput';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const Beard = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <LengthInput onChange={onChange('beard.length.value')} value={values['beard.length.value']}>
      Length
    </LengthInput>
    <FormControl className={classes.formControl}>
      <InputLabel>Color</InputLabel>
      <Select value={values['beard.color_id'] || ''} onChange={onChange('beard.color_id')}>
        {selects.beardColors.map(color => (
          <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(Beard);
