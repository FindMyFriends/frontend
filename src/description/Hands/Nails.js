import React from 'react';
import Color from './../components/Color.js';
import LengthWithUnit from './../components/LengthWithUnit.js';
import Rating from './../components/Rating.js';

const Nails = ({ selects, values, onChange }) => (
  <div>
    <h3>Nails</h3>
    <Color
      name="hands.nails.color"
      values={values}
      onChange={onChange}
      colors={selects.nailColors}
    />
    <br />
    <LengthWithUnit
      name="hands.nails.length"
      values={values}
      onChange={onChange}
      units={selects.lengthUnits}
    />
    <br />
    <p><span>{'Care'}</span></p>
    <Rating
      name="hands.nails.care"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
  </div>
);

export default Nails;
