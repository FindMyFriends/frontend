import React from 'react';
import PropTypes from 'prop-types';
import LengthWithUnit from './../../input/LengthWithUnit';
import Color from './../../input/Color';

const Beard = ({ selects: { beardColors, lengthUnits }, values, onChange }) => (
  <div>
    <Color
      name="beard.color_id"
      values={values}
      onChange={onChange}
      colors={beardColors}
    />
    <LengthWithUnit
      name="beard.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
  </div>
);

Beard.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Beard;
