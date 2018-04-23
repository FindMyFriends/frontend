import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import LengthWithUnit from './../../input/LengthWithUnit';
import Rating from './../../input/Rating';

const Nails = ({ selects: { nailColors, lengthUnits, ratings }, values, onChange }) => (
  <div>
    <Color
      name="hands.nails.color_id"
      values={values}
      onChange={onChange}
      colors={nailColors}
    />
    <LengthWithUnit
      name="hands.nails.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <p><span>Care</span></p>
    <Rating
      name="hands.nails.care"
      onChange={onChange}
      values={values}
      ratings={ratings}
    />
  </div>
);

Nails.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Nails;
