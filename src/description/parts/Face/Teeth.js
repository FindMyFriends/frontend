import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { onCheck } from './../../../forms/events';
import Rating from './../../input/Rating';

const Teeth = ({ selects: { ratings }, values, onChange }) => (
  <div>
    <p><span>Care</span></p>
    <Rating
      ratings={ratings}
      name="teeth.care"
      values={values}
      onChange={onChange}
    />
    <Checkbox
      label="Braces"
      name="teeth.braces"
      onCheck={onCheck(onChange, 'teeth.braces')}
      checked={values['teeth.braces']}
    />
  </div>
);

Teeth.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Teeth;
