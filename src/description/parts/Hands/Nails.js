import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import LengthWithUnit from './../../input/LengthWithUnit';
import { InputRating } from './../../../components/Rating';

const Nails = ({ selects: { nailColors, lengthUnits, ratings }, values, onChange }) => (
  <div>
    <Color
      name="hands.nails.color_id"
      values={values}
      onChange={onChange}
      colors={nailColors}
    />
    <LengthWithUnit
      name="hands.nails.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <InputRating
      max={ratings.maximum}
      current={values['hands.nails.care']}
      name="hands.nails.care"
      onChange={onChange}
    >
      Care
    </InputRating>
  </div>
);

Nails.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Nails;
