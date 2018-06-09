// @flow
import React from 'react';
import PermIdentity from '@material-ui/icons/PermIdentity';

type Props = {
  +props?: mixed,
};
const Icon = ({ ...props }: Props) => <PermIdentity {...props} />;

export default Icon;
