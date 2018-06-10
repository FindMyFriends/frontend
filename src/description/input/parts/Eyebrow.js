// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const Eyebrow = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Care</InputLabel>
      <Select value={values['eyebrow.care'] || ''} onChange={onChange('eyebrow.care')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Color</InputLabel>
      <Select value={values['eyebrow.color_id'] || ''} onChange={onChange('eyebrow.color_id')}>
        {selects.eyebrowColors.map(color => (
          <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default withFormStyles()(Eyebrow);
