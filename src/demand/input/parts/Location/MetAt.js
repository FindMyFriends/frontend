// @flow
import React from 'react';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { withFormStyles } from '../../../../description/input/parts/withFormStyles';
import Approximation from './Approximation';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
|};
const MetAt = ({
  onChange,
  values,
  selects,
  classes,
}: Props) => {
  const handleTimelineChange = (event) => {
    if (values['location.met_at.timeline_side'] === 'exactly') {
      onChange('location.met_at.approximation')({ target: { value: null } });
    } else {
      onChange('location.met_at.approximation')({ target: { value: 'PT1H' } });
    }
    onChange('location.met_at.timeline_side')(event);
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
        <DateTimePicker
          className={classes.formControl}
          value={values['location.met_at.moment']}
          onChange={
            datetime => onChange('location.met_at.moment')({ target: { value: datetime.format() } })
          }
        />
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <InputLabel>Timeline side</InputLabel>
        <Select value={values['location.met_at.timeline_side']} onChange={handleTimelineChange}>
          {selects.timelineSides.map(timelineSide => (
            <MenuItem key={timelineSide} value={timelineSide}>{timelineSide}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Approximation
        selects={selects}
        values={values}
        classes={classes}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default withFormStyles()(MetAt);
