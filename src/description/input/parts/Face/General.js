// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import { withFormStyles } from '../withFormStyles';
import IndeterminateCheckbox from '../../../../components/MUI/IndeterminateCheckbox';
import InputRating from '../../../../components/Rating/InputRating';

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
    <InputRating current={values['face.care']} onChange={onChange('face.care')}>
      Care
    </InputRating>
    <FormControl className={classes.formControl}>
      <InputLabel>Shape</InputLabel>
      <Select value={values['face.shape_id'] || ''} onChange={onChange('face.shape_id')}>
        {selects.faceShapes.map(shape => (
          <MenuItem key={shape.id} value={shape.id}>{shape.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControlLabel
      label="Freckles"
      control={(
        <IndeterminateCheckbox
          checked={values['face.freckles']}
          onChange={onChange('face.freckles')}
        />
)}
    />
  </React.Fragment>
);

export default withFormStyles()(General);
