// @flow
import React from 'react';
import InputRating from '../../../../components/Rating/InputRating';

type Props = {|
  +onChange: (string) => ((Object) => (void)),
  +values: Object,
|};
const General = ({ onChange, values }: Props) => (
  <React.Fragment>
    <InputRating current={values['hands.care']} onChange={onChange('hands.care')}>
      Care
    </InputRating>
    <InputRating current={values['hands.vein_visibility']} onChange={onChange('hands.vein_visibility')}>
      Vein visibility
    </InputRating>
    <InputRating current={values['hands.joint_visibility']} onChange={onChange('hands.joint_visibility')}>
      Joint visibility
    </InputRating>
  </React.Fragment>
);

export default General;
