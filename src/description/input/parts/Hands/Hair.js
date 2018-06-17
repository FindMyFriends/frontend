// @flow
import React from 'react';
import InputRating from '../../../../components/Rating/InputRating';
import ColorInput from '../ColorInput';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
  +selects: Object,
|};
const General = ({
  onChange,
  values,
  selects,
}: Props) => (
  <React.Fragment>
    <InputRating current={values['hands.hair.amount']} onChange={onChange('hands.hair.amount')}>
      Amount
    </InputRating>
    <ColorInput colors={selects.handHairColors} value={values['hands.hair.color_id']} onChange={onChange('hands.hair.color_id')}>
      Color
    </ColorInput>
  </React.Fragment>
);

export default General;
