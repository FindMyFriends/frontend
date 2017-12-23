import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import LengthWithUnit from './components/LengthWithUnit.js';
import Color from './components/Color.js';

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
    <Color
      name="hair.color"
      colors={selects.hairColors}
      onChange={onChange}
      values={values}
    />
    <br />
    <LengthWithUnit
      name="hair.length"
      values={values}
      onChange={onChange}
      units={selects.lengthUnits}
    />
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