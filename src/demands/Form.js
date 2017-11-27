import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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

const Current = ({ step, label, onPrevious, onNext, ...rest }) => {
  let current = null;
  const last = step === 2,
    first = step === 1;
  if (step === 1) {
    current = <General {...rest} />
  } else if (step === 2) {
    current = <Body {...rest} />
  }
  return [
    current,
    first || <RaisedButton onClick={onPrevious} label={'Previous'} primary={true} />,
    <RaisedButton onClick={last ? rest.onSubmit : onNext} label={last ? label : 'Next'} primary={true} />
  ];
};

const Form = props => {
  return (
    <form>
      <Current {...props} />
    </form>
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
