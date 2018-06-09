// @flow
import React from 'react';
import YesIcon from '@material-ui/icons/Check';
import NoIcon from '@material-ui/icons/Close';

type YesNoProps = {
  +children: boolean,
};
const YesNo = ({ children, ...props }: YesNoProps) => (
  children ? <YesIcon {...props} /> : <NoIcon {...props} />
);

export default YesNo;