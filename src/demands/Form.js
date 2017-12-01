import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const General = ({ selects, values, onChange }) => (
  <div>
    <h2>General</h2>
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
    <TextField
      floatingLabelText="Build"
      onChange={onChange}
      value={values['body.build']}
      name="body.build"
    />
    <br />
    <TextField
      floatingLabelText="Skin"
      onChange={onChange}
      value={values['body.skin']}
      name="body.skin"
    />
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

const Face = ({ selects, values, onChange }) => (
  <div>
    <h2>Face</h2>
    <h3>Teeth</h3>
    <SelectField
      floatingLabelText="Care"
      onChange={(event, index, value) => onChange({ target: { name: 'face.teeth.care', value} })}
      value={values['face.teeth.care']}
      name="face.teeth.care"
    >
    {['high'].map(care => <MenuItem key={care} value={care} primaryText={care} />)}
    </SelectField>
    <br />
    <Checkbox
      name="face.teeth.braces"
      onChange={onChange}
      label='Braces'
      onCheck={(event, isChecked) => onChange({ target: { name: event.target.name, value: isChecked } })}
      checked={values['face.teeth.braces'] ? true : false}
    />
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
        3: <Face key={3} {...props} />,
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
