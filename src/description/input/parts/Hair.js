// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withFormStyles } from './withFormStyles';

type Props = {|
  +onChange: (property: string) => (void),
  +values: Object,
  +selects?: Object,
  +classes?: Object,
|};

const HighlightsForDyed = ({ onChange, values }: Props) => {
  if (values['hair.nature'] === true || values['hair.nature'] === null) {
    return null;
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={values['hair.highlights']}
          onChange={onChange('hair.highlights')}
          color="primary"
        />
      }
      label="Highlights"
    />
  );
};

const RootsForDyed = ({ onChange, values }: Props) => {
  if (values['hair.nature'] === true || values['hair.nature'] === null) {
    return null;
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={values['hair.roots']}
          onChange={onChange('hair.roots')}
          color="primary"
        />
      }
      label="Roots"
    />
  );
};

const Hair = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => (
  <React.Fragment>
    <FormControl className={classes.formControl}>
      <InputLabel>Style</InputLabel>
      <Select value={values['hair.style_id'] || ''} onChange={onChange('hair.style_id')}>
        {selects.hairStyles.map(style => (
          <MenuItem key={style.id} value={style.id}>{style.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Color</InputLabel>
      <Select value={values['hair.color_id'] || ''} onChange={onChange('hair.color_id')}>
        {selects.hairColors.map(color => (
          <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl className={classes.formControl}>
      <InputLabel>Length</InputLabel>
      <Input
        type="number"
        onChange={onChange('hair.length.value')}
        value={values['hair.length.value'] || ''}
        startAdornment={<InputAdornment position="start">Cm</InputAdornment>}
      />
    </FormControl>
    <FormControlLabel
      control={
        <Checkbox
          checked={values['hair.nature']}
          onChange={onChange('hair.nature')}
          color="primary"
        />
      }
      label="Nature"
    />
    <HighlightsForDyed onChange={onChange} values={values} />
    <RootsForDyed onChange={onChange} values={values} />
  </React.Fragment>
);

export default withFormStyles()(Hair);
