import React from 'react';
import TextField from 'material-ui/TextField';
import { GithubPicker } from 'react-color';
import LengthWithUnit from './../components/LengthWithUnit.js';

const Beard = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Beard</h3>
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.beardColors.name[selects.beardColors.hex.indexOf(values['face.beard.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.beard.color', value } })}
      colors={selects.beardColors.hex}
    />
    <br />
    <LengthWithUnit
      name="face.beard.length"
      values={values}
      onChange={onChange}
      units={selects.lengthUnits}
    />
    <br />
  </div>
);

export default Beard;
