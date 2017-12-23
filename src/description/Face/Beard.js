import React from 'react';
import LengthWithUnit from './../components/LengthWithUnit.js';
import Color from './../components/Color.js';

const Beard = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Beard</h3>
    <Color
      name="face.beard.color"
      values={values}
      onChange={onChange}
      colors={selects.beardColors}
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
