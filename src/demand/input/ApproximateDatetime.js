import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import * as moment from 'moment';
import range from 'lodash/range';
import { onSelectChange } from './../../forms/events';

const number = duration => duration.hours() || duration.days();

const unit = (duration) => {
  if (duration.hours()) {
    return 'hours';
  } else if (duration.days()) {
    return 'days';
  }
  return null;
};

const onNumberChange = (classic, duration) => (event, index, value) => {
  onSelectChange(classic({ target: { name: 'location.met_at.approximation', value: moment.duration({ [unit(duration)]: value }).toISOString() } }));
};

const onUnitChange = (classic, duration) => (event, index, value) => {
  onSelectChange(classic({ target: { name: 'location.met_at.approximation', value: moment.duration({ [value]: number(duration) }).toISOString() } }));
};

const time = duration => ({ hours: range(1, 24), days: range(1, 15) }[unit(duration)]);

const Approximation = ({ values, selects: { timelineSides }, onChange }) => {
  const side = (
    <SelectField
      floatingLabelText="Timeline side"
      onChange={onSelectChange(onChange, 'location.met_at.timeline_side')}
      value={values['location.met_at.timeline_side']}
      name="location.met_at.timeline_side"
    >
      {timelineSides.map(timelineSide => (
        <MenuItem key={timelineSide} value={timelineSide} primaryText={timelineSide} />
        ))}
    </SelectField>
  );
  if (values['location.met_at.timeline_side'] === 'exactly') {
    return side;
  }
  const duration = moment.duration(values['location.met_at.approximation']);
  return (
    <div>
      {side}
      <SelectField
        floatingLabelText="Approximation"
        onChange={onNumberChange(onChange, duration)}
        value={number(duration)}
      >
        {time(duration).map(time => <MenuItem key={time} value={time} primaryText={time} />)}
      </SelectField>
      <SelectField
        floatingLabelText="Units"
        onChange={onUnitChange(onChange, duration)}
        value={unit(duration)}
      >
        <MenuItem key="hours" value="hours" primaryText="Hours" />
        <MenuItem key="days" value="days" primaryText="Days" />
      </SelectField>
    </div>
  );
};

const ApproximateDatetime = ({ values, selects, onChange }) => {
  return (
    <div>
      <DateTimePicker
        floatingLabelText="Moment"
        onChange={value => onChange({ target: { name: 'location.met_at.moment', value } })}
        DatePicker={DatePickerDialog}
        TimePicker={TimePickerDialog}
        value={values['location.met_at.moment']}
        name="location.met_at.moment"
      />
      <Approximation
        values={values}
        selects={selects}
        onChange={onChange}
      />
    </div>
  );
};

ApproximateDatetime.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

Approximation.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default ApproximateDatetime;
