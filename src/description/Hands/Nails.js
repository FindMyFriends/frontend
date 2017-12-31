import React from 'react';
import PropTypes from 'prop-types';
import Color from './../components/Color';
import LengthWithUnit from './../components/LengthWithUnit';
import Rating from './../components/Rating';

const Nails = ({ selects: { nailColors, lengthUnits, ratings }, values, onChange }) => (
  <div>
    <h3>Nails</h3>
    <Color
      name="hands.nails.color_id"
      values={values}
      onChange={onChange}
      colors={nailColors}
    />
    <br />
    <LengthWithUnit
      name="hands.nails.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <br />
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
