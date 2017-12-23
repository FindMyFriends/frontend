import React from 'react';
import Slider from 'material-ui/Slider';
import Color from './../components/Color.js';

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
    <Color
      name="face.eyebrow.color"
      values={values}
      onChange={onChange}
      colors={selects.eyebrowColors}
    />
    <br />
  </div>
);

export default Eyebrow;
