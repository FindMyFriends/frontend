// @flow
import React from 'react';
import { default as MaterialSnackbar } from '@material-ui/core/Snackbar';

type Props = {|
  +children: string,
  +onClose: () => mixed,
|};
const Snackbar = ({ children, onClose }: Props) => (
  <MaterialSnackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open
    autoHideDuration={3000}
    onClose={onClose}
    ContentProps={{ 'aria-describedby': 'message-id' }}
    message={<span id="message-id">{children}</span>}
  />
);

export default Snackbar;
