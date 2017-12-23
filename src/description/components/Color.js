import React from 'react';
import TextField from 'material-ui/TextField';
import { GithubPicker } from 'react-color';

const Color = ({ colors, name, onChange, values }) => (
  <div>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={colors.name[colors.hex.indexOf(values[name])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name, value } })}
      colors={colors.hex}
    />
  </div>
);

export default Color;
