import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { onCheck } from './../../../forms/events';
import { InputRating } from './../../../components/Rating';

const Teeth = ({ selects: { ratings }, values, onChange }) => (
  <div>
    <InputRating
      max={ratings.maximum}
      current={values['teeth.care'] || 0}
      name="teeth.care"
      onChange={onChange}
    >
      Care
    </InputRating>
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
