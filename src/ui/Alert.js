// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';

type Props = {|
  +children: string,
  +onClose: () => mixed,
  +fullScreen: boolean,
|};
const Alert = ({ children, onClose, fullScreen }: Props) => (
  <Dialog
    fullScreen={fullScreen}
    open
    onClose={onClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Ok</Button>
    </DialogActions>
  </Dialog>
);

export default withMobileDialog()(Alert);