import React from 'react';
import PropTypes from 'prop-types';
import { InputRating } from './../../../components/Rating';

const General = ({ selects: { ratings }, values, onChange }) => (
  <div>
    <InputRating
      max={ratings.maximum}
      current={values['hands.care'] || 0}
      name="hands.care"
      onChange={onChange}
    >
      Care
    </InputRating>
    <br />
    <InputRating
      max={ratings.maximum}
      current={values['hands.vein_visibility'] || 0}
      name="hands.vein_visibility"
      onChange={onChange}
    >
      Vein visibility
    </InputRating>
    <br />
    <InputRating
      max={ratings.maximum}
      current={values['hands.joint_visibility'] || 0}
      name="hands.joint_visibility"
      onChange={onChange}
    >
      Joint visibility
    </InputRating>
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
