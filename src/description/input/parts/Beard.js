// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import ColorInput from './ColorInput';
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
    <FormControl className={classes.formControl}>
      <InputLabel>Length</InputLabel>
      <Select value={values['beard.length_id'] || ''} onChange={onChange('beard.length_id')}>
        {selects.beardLengths.map(length => (
          <MenuItem key={length.id} value={length.id}>{length.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Style</InputLabel>
      <Select value={values['beard.style_id'] || ''} onChange={onChange('beard.style_id')}>
        {selects.beardStyles.map(style => (
          <MenuItem key={style.id} value={style.id}>{style.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <ColorInput colors={selects.beardColors} value={values['beard.color_id']} onChange={onChange('beard.color_id')}>
      Color
    </ColorInput>
  </React.Fragment>
);

export default withFormStyles()(Beard);
