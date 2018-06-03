// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

type Props = {|
  +children: string,
  +onClose: () => mixed,
  +fullScreen: boolean,
  +onConfirm: () => (void),
|};
const Confirmation = ({ children, onClose, onConfirm, fullScreen }: Props) => (
  <Dialog
    fullScreen={fullScreen}
    open
    onClose={onClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">No</Button>
      <Button onClick={() => confirmClose(onClose, onConfirm)} color="secondary">Yes</Button>
    </DialogActions>
  </Dialog>
);

const confirmClose = (onClose: () => (mixed), onConfirm: () => (void)) => {
  onConfirm();
  onClose();
};

export default withMobileDialog()(Confirmation);