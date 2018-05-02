import React from 'react';
import PropTypes from 'prop-types';
import Color from './../../input/Color';
import { InputRating } from './../../../components/Rating';

const Hair = ({ selects: { nailColors, ratings }, values, onChange }) => (
  <div>
    <Color
      name="hands.hair.color_id"
      values={values}
      onChange={onChange}
      colors={nailColors}
    />
    <InputRating
      max={ratings.maximum}
      current={values['hands.hair.amount']}
      name="hands.hair.amount"
      onChange={onChange}
    >
      Amount
    </InputRating>
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
