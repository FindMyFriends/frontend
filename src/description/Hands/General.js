import React from 'react';
import PropTypes from 'prop-types';
import Rating from './../components/Rating';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>Hands</h2>
    <h3>General</h3>
    <p><span>Care</span></p>
    <Rating
      name="hands.care"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
    <p><span>Vein visibility</span></p>
    <Rating
      name="hands.vein_visibility"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
    <p><span>Joint visibility</span></p>
    <Rating
      name="hands.joint_visibility"
      onChange={onChange}
      values={values}
      ratings={selects.ratings}
    />
    <br />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
