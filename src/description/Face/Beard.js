import React from 'react';
import PropTypes from 'prop-types';
import LengthWithUnit from './../components/LengthWithUnit';
import Color from './../components/Color';

const Beard = ({ selects: { beardColors, lengthUnits }, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Beard</h3>
    <Color
      name="beard.color_id"
      values={values}
      onChange={onChange}
      colors={beardColors}
    />
    <br />
    <LengthWithUnit
      name="beard.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <br />
  </div>
);

Beard.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Beard;
