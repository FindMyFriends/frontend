import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import Rating from './../../input/Rating';

const Hair = ({ selects: { nailColors, ratings }, values, onChange }) => (
  <div>
    <Color
      name="hands.hair.color_id"
      values={values}
      onChange={onChange}
      colors={nailColors}
    />
    <p><span>Amount</span></p>
    <Rating
      name="hands.hair.amount"
      onChange={onChange}
      values={values}
      ratings={ratings}
    />
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
