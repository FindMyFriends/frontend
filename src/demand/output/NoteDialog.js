// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

type NoteDialogPropTypes = {
  opened: bool,
  onClose: () => void,
  onTextChange: (string) => void,
  onSave: () => void,
  children: string,
};
const NoteDialog = ({
  opened,
  onClose,
  onTextChange,
  onSave,
  children,
}: NoteDialogPropTypes) => (
  <Dialog
    title="Note"
    actions={
      [
        <FlatButton
          label="Cancel"
          primary
          onClick={onClose}
        />,
        <RaisedButton
          label="Save"
          primary
          onClick={() => {
            onSave();
            onClose();
          }}
        />,
      ]
    }
    modal
    open={opened}
    onRequestClose={onClose}
  >
    <TextField
      hintText="Text"
      value={children}
      onChange={event => onTextChange(event.target.value)}
    />
  </Dialog>
);

export default NoteDialog;
