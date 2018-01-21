import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Rating from './../components/Rating';
import { onCheck, onSelectEnumChange } from './../../forms/events';
import { name as enumName } from './../../enum';

const General = ({ selects: { ratings, shapes }, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>General</h3>
    <p>
      <span>Care</span>
    </p>
    <Rating
      style={{ width: 200 }}
      ratings={ratings}
      name="face.care"
      values={values}
      onChange={onChange}
    />
    <br />
    <Checkbox
      label="Freckles"
      name="face.freckles"
      onCheck={onCheck(onChange, 'face.freckles')}
      checked={values['face.freckles']}
    />
    <SelectField
      floatingLabelText="Shape"
      onChange={onSelectEnumChange(onChange, 'face.shape_id', shapes)}
      value={enumName(values['face.shape_id'], shapes.id, shapes.name)}
      name="face.shape_id"
    >
      {shapes.name.map(shape => <MenuItem key={shape} value={shape} primaryText={shape} />)}
    </SelectField>
    <br />
  </div>
);

General.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default General;
