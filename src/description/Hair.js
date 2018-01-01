import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import LengthWithUnit from './components/LengthWithUnit';
import Color from './components/Color';
import { onCheck } from './../forms/onChange';

const Hair = ({ selects: { hairColors, lengthUnits }, values, onChange }) => (
  <div>
    <h2>Hair</h2>
    <br />
    <TextField
      floatingLabelText="Style"
      onChange={onChange}
      value={values['hair.style']}
      name="hair.style"
    />
    <br />
    <Color
      name="hair.color_id"
      colors={hairColors}
      onChange={onChange}
      values={values}
    />
    <br />
    <LengthWithUnit
      name="hair.length"
      values={values}
      onChange={onChange}
      units={lengthUnits}
    />
    <br />
    <Checkbox
      label="Highlights"
      name="hair.highlights"
      onCheck={onCheck(onChange, 'hair.highlights')}
      checked={values['hair.highlights']}
    />
    <br />
    <Checkbox
      label="Roots"
      name="hair.roots"
      onCheck={onCheck(onChange, 'hair.roots')}
      checked={values['hair.roots']}
    />
    <br />
    <Checkbox
      label="Nature"
      name="hair.nature"
      onCheck={onCheck(onChange, 'hair.nature')}
      checked={values['hair.nature']}
    />
    <br />
  </div>
);

Hair.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Hair;
