// @flow
import React from 'react';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

type Props = {
  +props?: mixed,
};
const Icon = ({ ...props }: Props) => <SupervisorAccount {...props} />;

export default Icon;
