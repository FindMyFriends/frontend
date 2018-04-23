import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Rating from './../../input/Rating';
import { onCheck, onSelectEnumChange } from './../../../forms/events';

const General = ({ selects: { ratings, shapes }, values, onChange }) => (
  <div>
    <span>Care</span>
    <Rating
      ratings={ratings}
      name="face.care"
      values={values}
      onChange={onChange}
    />
    <Checkbox
      label="Freckles"
      name="face.freckles"
      onCheck={onCheck(onChange, 'face.freckles')}
      checked={values['face.freckles']}
    />
    <SelectField
      floatingLabelText="Shape"
      onChange={onSelectEnumChange(onChange, 'face.shape_id', shapes)}
      value={shapes[values['face.shape_id']]}
      name="face.shape_id"
    >
      {Object.values(shapes).map(shape => (
        <MenuItem key={shape} value={shape} primaryText={shape} />
      ))}
    </SelectField>
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
