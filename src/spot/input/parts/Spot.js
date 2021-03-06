// @flow
import React from 'react';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';
import Approximation from './Approximation';
import Map from '../../output/Map';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +position: number,
  +selects: Object,
  +classes: Object,
|};
const Spot = ({
  position,
  onChange,
  values,
  selects,
  classes,
}: Props) => {
  const handleTimelineChange = (event) => {
    if (values[`spots.${position}.met_at.timeline_side`] === 'exactly') {
      onChange(`spots.${position}.met_at.approximation`)({ target: { value: '' } });
    } else {
      onChange(`spots.${position}.met_at.approximation`)({ target: { value: 'PT1H' } });
    }
    onChange(`spots.${position}.met_at.timeline_side`)(event);
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
        <DateTimePicker
          className={classes.formControl}
          value={values[`spots.${position}.met_at.moment`]}
          onChange={
            datetime => onChange(`spots.${position}.met_at.moment`)({ target: { value: datetime.format() } })
          }
        />
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <InputLabel>Timeline side</InputLabel>
        <Select value={values[`spots.${position}.met_at.timeline_side`] || ''} onChange={handleTimelineChange}>
          {selects.timelineSides.map(timelineSide => (
            <MenuItem key={timelineSide} value={timelineSide}>{timelineSide}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Approximation
        position={position}
        selects={selects}
        values={values}
        classes={classes}
        onChange={onChange}
      />
      <Map
        position={
          {
            latitude: values[`spots.${position}.coordinates.latitude`],
            longitude: values[`spots.${position}.coordinates.longitude`],
          }
        }
        onMarkerPositionChange={coordinates => onChange(`spots.${position}.coordinates`)({ target: { value: coordinates } })}
      />
    </React.Fragment>
  );
};

export default withFormStyles()(Spot);
