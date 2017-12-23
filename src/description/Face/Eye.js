import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { GithubPicker } from 'react-color';

const Eye = ({ selects, values, onChange, side }) => {
  const identifier = {
    color: `face.${side}_eye.color`,
    lenses: `face.${side}_eye.lenses`,
  };
  return (
    <div>
      <TextField
        floatingLabelText="Color"
        onChange={onChange}
        value={selects.eyeColors.name[selects.eyeColors.hex.indexOf(values[identifier.color])]}
        disabled
      />
      <GithubPicker
        onChange={({ hex: value }) => onChange({ target: { name: identifier.color, value } })}
        colors={selects.eyeColors.hex}
      />
      <br />
      <Checkbox
        label="Lenses"
        name={identifier.lenses}
        value={values[identifier.lenses]}
      />
      <br />
    </div>
  );
};

const Eyes = props => (
  <div>
    <h2>Eye</h2>
    <h3>Left</h3>
    <Eye side="left" {...props} />
    <h3>Right</h3>
    <Eye side="right" {...props} />
  </div>
);

export default Eyes;
