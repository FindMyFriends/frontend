import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import Rating from './../../input/Rating';

const Eyebrow = ({ selects: { ratings, eyebrowColors }, values, onChange }) => (
  <div>
    <p><span>Care</span></p>
    <Rating
      style={{ width: 200 }}
      ratings={ratings}
      name="eyebrow.care"
      values={values}
      onChange={onChange}
    />
    <Color
      name="eyebrow.color_id"
      values={values}
      onChange={onChange}
      colors={eyebrowColors}
    />
    <br />
  </div>
);

Eyebrow.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Eyebrow;
