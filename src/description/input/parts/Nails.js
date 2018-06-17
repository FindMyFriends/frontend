// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from './withFormStyles';
import InputRating from '../../../components/Rating/InputRating';
import LengthInput from './LengthInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const Hair = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Color</InputLabel>
      <Select value={values['hands.nails.color_id'] || ''} onChange={onChange('hands.nails.color_id')}>
        {selects.nailsColors.map(color => (
          <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <LengthInput onChange={onChange('hands.nails.length.value')} value={values['hands.nails.length.value']}>
      Length
    </LengthInput>
    <InputRating current={values['hands.nails.care']} onChange={onChange('hands.nails.care')}>
      Care
    </InputRating>
  </React.Fragment>
);

export default withFormStyles()(Hair);
