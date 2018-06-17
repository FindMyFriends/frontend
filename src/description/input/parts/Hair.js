// @flow
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import IndeterminateCheckbox from '../../../components/MUI/IndeterminateCheckbox';
import LengthInput from './LengthInput';
import { withFormStyles } from './withFormStyles';
import ColorInput from './ColorInput';

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
    <ColorInput colors={selects.hairColors} value={values['hair.color_id']} onChange={onChange('hair.color_id')}>
      Color
    </ColorInput>
    <LengthInput value={values['hair.length.value']} onChange={onChange('hair.length.value')}>
      Length
    </LengthInput>
    <FormGroup>
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
    </FormGroup>
  </React.Fragment>
);

export default withFormStyles()(Hair);
