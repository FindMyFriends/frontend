import React from 'react';
import PropTypes from 'prop-types';
import Color from './../components/Color';
import Rating from './../components/Rating';

const Hair = ({ selects, values, onChange }) => (
  <div>
    <h3>Hand hair</h3>
    <Color
      name="hands.hair.color_id"
      values={values}
      onChange={onChange}
      colors={selects.nailColors}
    />
    <br />
    <p><span>Amount</span></p>
    <Rating
      name="hands.hair.amount"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
