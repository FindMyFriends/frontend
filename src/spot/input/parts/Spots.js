// @flow
import React from 'react';
import { unflatten } from 'flat';
import Button from '@material-ui/core/Button';
import { withFormStyles } from '../../../description/input/parts/withFormStyles';
import Spot from './Spot';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
  +classes: Object,
  +onSpotAppend: () => (void),
  +onSpotDetach: (number) => (void),
|};
const Spots = ({
  onChange,
  values,
  selects,
  classes,
  onSpotAppend,
  onSpotDetach,
}: Props) => {
  const { spots } = unflatten(values);
  return (
    <React.Fragment>
      {spots.map((spot: Object, position: number) => (
        <React.Fragment key={spot.id}>
          <Spot
            onChange={onChange}
            values={values}
            selects={selects}
            classes={classes}
            position={position}
          />
          {spots.length > 1 && (
            <Button variant="raised" onClick={() => onSpotDetach(position)} color="secondary">
              -
            </Button>
          )}
        </React.Fragment>
      ))}
      <Button variant="raised" onClick={onSpotAppend} color="primary">
        +
      </Button>
    </React.Fragment>
  );
};

export default withFormStyles()(Spots);
