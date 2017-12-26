import React from 'react';
import PropTypes from 'prop-types';
import Color from './../components/Color';
import LengthWithUnit from './../components/LengthWithUnit';
import Rating from './../components/Rating';

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
    <p><span>Care</span></p>
    <Rating
      name="hands.nails.care"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
  </div>
);

Nails.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Nails;
