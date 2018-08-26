// @flow
import React from 'react';
import YesIcon from '@material-ui/icons/Check';
import NoIcon from '@material-ui/icons/Close';


type Props = {
  +children: ?boolean,
};
export const YesNoMaybe = ({ children, ...passedProps }: Props) => {
  const props = {
    style: {
      fontSize: 15,
    },
    ...passedProps,
  };
  if (children === true) {
    return <YesIcon {...props} />;
  } else if (children === false) {
    return <NoIcon {...props} />;
  }
  return <i>-</i>;
};
