import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import { InputRating } from './../../../components/Rating';

const Eyebrow = ({ selects: { ratings, eyebrowColors }, values, onChange }) => (
  <div>
    <InputRating
      max={ratings.maximum}
      current={values['eyebrow.care']}
      name="eyebrow.care"
      onChange={onChange}
    >
      Care
    </InputRating>
    <Color
      name="eyebrow.color_id"
      values={values}
      onChange={onChange}
      colors={eyebrowColors}
    />
  </div>
);

Eyebrow.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Eyebrow;
