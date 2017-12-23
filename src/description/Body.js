import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

const Body = ({ selects, values, onChange }) => (
  <div>
    <h2>Body</h2>
    <SelectField
      floatingLabelText="Build"
      onChange={(event, index, value) => onChange({ target: { name: 'body.build', value} })}
      value={values['body.build']}
      name="body.build"
    >
    {selects.bodyBuilds.map(build => <MenuItem key={build} value={build} primaryText={build} />)}
    </SelectField>
    <br />
    <SelectField
      floatingLabelText="Skin"
      onChange={(event, index, value) => onChange({ target: { name: 'body.skin', value} })}
      value={values['body.skin']}
      name="body.skin"
    >
    {selects.skinColors.map(color => <MenuItem key={color} value={color} primaryText={color} />)}
    </SelectField>
    <br />
    <TextField
      type="number"
      floatingLabelText="Weight"
      onChange={onChange}
      value={values['body.weight']}
      name="body.weight"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Height"
      onChange={onChange}
      value={values['body.height']}
      name="body.height"
    />
  </div>
);

export default Body;
