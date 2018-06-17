// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IndeterminateCheckbox from '../../../components/MUI/IndeterminateCheckbox';
import { withFormStyles } from './withFormStyles';

type PartialProps = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
|};
const HighlightsForDyed = ({ onChange, values }: PartialProps) => {
  if (values['hair.nature'] === true || values['hair.nature'] === null) {
    return null;
  }
  return (
    <FormControlLabel
      label="Highlights"
      control={
        <IndeterminateCheckbox
          checked={values['hair.highlights']}
          onChange={onChange('hair.highlights')}
        />
      }
    />
  );
};

const RootsForDyed = ({ onChange, values }: PartialProps) => {
  if (values['hair.nature'] === true || values['hair.nature'] === null) {
    return null;
  }
  return (
    <FormControlLabel
      label="Roots"
      control={
        <IndeterminateCheckbox
          checked={values['hair.roots']}
          onChange={onChange('hair.roots')}
        />
      }
    />
  );
};

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
      label="Nature"
      control={
        <IndeterminateCheckbox
          checked={values['hair.nature']}
          onChange={onChange('hair.nature')}
        />
      }
    />
    <HighlightsForDyed onChange={onChange} values={values} />
    <RootsForDyed onChange={onChange} values={values} />
  </React.Fragment>
);

export default withFormStyles()(Hair);
