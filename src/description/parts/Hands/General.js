import React from 'react';
import PropTypes from 'prop-types';
import Rating from './../../input/Rating';

const General = ({ selects: { ratings }, values, onChange }) => (
  <div>
    <p><span>Care</span></p>
    <Rating
      name="hands.care"
      onChange={onChange}
      values={values}
      ratings={ratings}
    />
    <p><span>Vein visibility</span></p>
    <Rating
      name="hands.vein_visibility"
      onChange={onChange}
      values={values}
      ratings={ratings}
    />
    <p><span>Joint visibility</span></p>
    <Rating
      name="hands.joint_visibility"
      onChange={onChange}
      values={values}
      ratings={ratings}
    />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
