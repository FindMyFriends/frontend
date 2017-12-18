import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { GithubPicker } from 'react-color';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>General</h2>
    <TextField
      floatingLabelText="Firstname"
      onChange={onChange}
      value={values['general.firstname']}
      name="general.firstname"
    />
    <br />
    <SelectField
      floatingLabelText="Gender"
      onChange={(event, index, value) => onChange({ target: { name: 'general.gender', value} })}
      value={values['general.gender']}
      name="general.gender"
    >
    {selects.genders.map(gender => <MenuItem key={gender} value={gender} primaryText={gender} />)}
    </SelectField>
    <br />
    <SelectField
      floatingLabelText="Race"
      onChange={(event, index, value) => onChange({ target: { name: 'general.race', value} })}
      value={values['general.race']}
      name="general.race"
    >
    {selects.races.map(race => <MenuItem key={race} value={race} primaryText={race} />)}
    </SelectField>
    <br />
    <TextField
      type="number"
      floatingLabelText="Age from"
      onChange={onChange}
      value={values['general.age.from']}
      name="general.age.from"
    />
    <br />
    <TextField
      type="number"
      floatingLabelText="Age to"
      onChange={onChange}
      value={values['general.age.to']}
      name="general.age.to"
    />
  </div>
);

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

const Hair = ({ selects, values, onChange }) => (
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
    <TextField
      floatingLabelText="Color"
      onChange={onChange}
      value={selects.hairColors.name[selects.hairColors.hex.indexOf(values['hair.color'])]}
      disabled
    />
    <GithubPicker
      onChange={({ hex: value }) => onChange({ target: { name: 'hair.color', value } })}
      colors={selects.hairColors.hex}
    />
    <br />
  </div>
);

const Current = ({ step, label, onTurn, steps, ...rest }) => {
  const last = step === Math.max(Object.keys(steps)),
    first = step === 1;
  return [
    steps[step],
    first || <RaisedButton key="previous" onClick={() => onTurn(-1)} label={'Previous'} primary={true} />,
    <RaisedButton key="next|submit" onClick={last ? rest.onSubmit : () => onTurn(+1)} label={last ? label : 'Next'} primary={true} />
  ];
};

const Form = props => {
  return (
    <Current
      {...props}
      steps={{
        1: <General key={1} {...props} />,
        2: <Body key={2} {...props} />,
        3: <Hair key={3} {...props} />,
      }}
    />
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Form;
