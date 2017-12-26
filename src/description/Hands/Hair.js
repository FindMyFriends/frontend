import React from 'react';
import Color from './../components/Color.js';
import Rating from './../components/Rating.js';

const Hair = ({ selects, values, onChange }) => (
  <div>
    <h3>Hand hair</h3>
    <Color
      name="hands.hair.color"
      values={values}
      onChange={onChange}
      colors={selects.nailColors}
    />
    <br />
    <p><span>{'Amount'}</span></p>
    <Rating
      name="hands.hair.amount"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
  </div>
);

export default Hair;
