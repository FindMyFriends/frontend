// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withFormStyles } from './withFormStyles';

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
    <FormControl className={classes.formControl}>
      <InputLabel>Length</InputLabel>
      <Input
        type="number"
        onChange={onChange('hands.nails.length.value')}
        value={values['hands.nails.length.value'] || ''}
        startAdornment={<InputAdornment position="start">Cm</InputAdornment>}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Care</InputLabel>
      <Select value={values['hands.nails.care'] || ''} onChange={onChange('hands.nails.care')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(Hair);
