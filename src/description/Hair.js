import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import { GithubPicker } from 'react-color';

const Hair = ({ selects, values, onChange }) => (
  <div>
    <h2>Hair</h2>
    <br />
    <TextField
      floatingLabelText="Style"
      onChange={onChange}
      value={values['hair.style']}
      name="hair.style"
    />
    <br />
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.hairColors.name[selects.hairColors.hex.indexOf(values['hair.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'hair.color', value } })}
      colors={selects.hairColors.hex}
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Length"
      onChange={onChange}
      name="hair.length.value"
      value={values['hair.length.value']}
    />
    <br />
    <SelectField
      floatingLabelText="Unit"
      onChange={(event, index, value) => onChange({ target: { name: 'hair.length.unit', value} })}
      value={values['hair.length.unit']}
      name="hair.length.unit"
    >
    {selects.lengthUnits.map(unit => <MenuItem key={unit} value={unit} primaryText={unit} />)}
    </SelectField>
    <br />
    <Checkbox
      label="Highlights"
      name="hair.highlights"
      value={values['hair.highlights']}
    />
    <br />
    <Checkbox
      label="Roots"
      name="hair.roots"
      value={values['hair.roots']}
    />
    <br />
    <Checkbox
      label="Nature"
      name="hair.nature"
      value={values['hair.nature']}
    />
    <br />
  </div>
);

export default Hair;
