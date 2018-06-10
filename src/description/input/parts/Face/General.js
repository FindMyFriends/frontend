// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withFormStyles } from '../withFormStyles';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const General = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Care</InputLabel>
      <Select value={values['face.care'] || ''} onChange={onChange('face.care')}>
        {selects.ratings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Shape</InputLabel>
      <Select value={values['face.shape'] || ''} onChange={onChange('face.shape')}>
        {selects.faceShapes.map(shape => (
          <MenuItem key={shape.id} value={shape.id}>{shape.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControlLabel
      control={
        <Checkbox
          checked={values['face.freckles']}
          onChange={onChange('face.freckles')}
          color="primary"
        />
      }
      label="Freckles"
    />
  </React.Fragment>
);

export default withFormStyles()(General);
