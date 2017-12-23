import React from 'react';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import { GithubPicker } from 'react-color';

const Eyebrow = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Eyebrow</h3>
    <p><span>{'Care'}</span></p>
    <Slider
      style={{width: 200}}
      min={selects.ratings.minimum}
      max={selects.ratings.maximum}
      step={1}
      value={values['face.eyebrow.care']}
      onChange={onChange}
    />
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.eyebrowColors.name[selects.eyebrowColors.hex.indexOf(values['face.eyebrow.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'face.eyebrow.color', value } })}
      colors={selects.eyebrowColors.hex}
    />
    <br />
  </div>
);

export default Eyebrow;
