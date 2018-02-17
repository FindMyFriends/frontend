// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

type Props = {
  content: string,
  onClose: () => mixed,
  onConfirm: () => mixed,
};

const Confirmation = ({ content, onClose, onConfirm }: Props) => (
  <Dialog
    title="Are you sure?"
    actions={
      [
        <FlatButton
          label="Yes"
          primary
          onClick={onConfirm}
        />,
        <FlatButton
          label="No"
          primary
          onClick={onClose}
        />,
      ]
    }
    modal={false}
    open
    onRequestClose={onClose}
  >
    {content}
  </Dialog>
);

export default Confirmation;
