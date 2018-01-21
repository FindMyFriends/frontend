import React from 'react';
import PropTypes from 'prop-types';
import Color from './../components/Color';
import Rating from './../components/Rating';

const Eyebrow = ({ selects: { ratings, eyebrowColors }, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Eyebrow</h3>
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
