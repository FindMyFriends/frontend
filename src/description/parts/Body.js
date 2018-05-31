import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { onSelectEnumChange } from './../../forms/events';
import { MaterialLabel } from '../../components/Label';

const BreastSizeBySex = ({ selects: { breastSizes }, values, onChange }) => {
  if (values['general.sex'] === 'man') {
    return null;
  }
  return (
    <div>
      <MaterialLabel>Breast size</MaterialLabel>
      <RadioButtonGroup
        valueSelected={values['body.breast_size']}
        name="body.breast_size"
        onChange={(event, value) => onChange({ target: { name: 'body.breast_size', value } })}
      >
        {Object.values(breastSizes).map(size => (
          <RadioButton key={size} value={size} label={size} />
        ))}
      </RadioButtonGroup>
    </div>
  );
};

const Body = ({ selects: { bodyBuilds, breastSizes }, values, onChange }) => (
  <div>
    <SelectField
      floatingLabelText="Build"
      onChange={onSelectEnumChange(onChange, 'body.build_id', bodyBuilds)}
      value={bodyBuilds[values['body.build_id']] || 0}
      name="body.build_id"
    >
      <MenuItem key={0} value={0} primaryText="unknown" />
      {Object.values(bodyBuilds).map(build => (
        <MenuItem key={build} value={build} primaryText={build} />
      ))}
    </SelectField>
    <TextField
      type="number"
      floatingLabelText="Weight"
      onChange={onChange}
      value={values['body.weight.value'] || ''}
      name="body.weight.value"
    />
    <TextField
      type="number"
      floatingLabelText="Height"
      onChange={onChange}
      value={values['body.height.value'] || ''}
      name="body.height.value"
    />
    <BreastSizeBySex values={values} onChange={onChange} selects={{ breastSizes }} />
  </div>
);

Body.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

BreastSizeBySex.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default Body;
