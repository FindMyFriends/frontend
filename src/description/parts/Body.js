import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'rc-slider';
import { combined } from './../../api/enum';
import { onSelectEnumChange } from './../../forms/events';

const BreastSizeByGender = ({ selects: { breastSizes }, values, onChange }) => {
  if (values['general.gender'] === 'man') {
    return null;
  }
  const numericSizes = combined([0, 1, 2, 3], breastSizes);
  const letterSizes = combined(breastSizes, [0, 1, 2, 3]);
  return (
    <div>
      <span>Breast size</span>
      <Slider
        step={1}
        min={0}
        max={3}
        marks={numericSizes}
        onChange={numericSize => onChange({ target: { name: 'body.breast_size', value: numericSizes[numericSize] } })}
        value={letterSizes[values['body.breast_size']]}
      />
    </div>
  );
};

const Body = ({ selects: { bodyBuilds, breastSizes }, values, onChange }) => (
  <div>
    <SelectField
      floatingLabelText="Build"
      onChange={onSelectEnumChange(onChange, 'body.build_id', bodyBuilds)}
      value={bodyBuilds[values['body.build_id']]}
      name="body.build_id"
    >
      {Object.values(bodyBuilds).map(build => (
        <MenuItem key={build} value={build} primaryText={build} />
      ))}
    </SelectField>
    <TextField
      type="number"
      floatingLabelText="Weight"
      onChange={onChange}
      value={values['body.weight.value']}
      name="body.weight.value"
    />
    <TextField
      type="number"
      floatingLabelText="Height"
      onChange={onChange}
      value={values['body.height.value']}
      name="body.height.value"
    />
    <BreastSizeByGender values={values} onChange={onChange} selects={{ breastSizes }} />
  </div>
);

Body.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

BreastSizeByGender.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Body;
