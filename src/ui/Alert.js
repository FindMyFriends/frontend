// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

type Props = {
  content: string,
  onClose: () => mixed,
};

const Alert = ({ content, onClose }: Props) => (
  <Dialog
    title="Error"
    actions={
      <FlatButton
        label="Ok"
        primary
        onClick={onClose}
      />
    }
    modal={false}
    open
    onRequestClose={onClose}
  >
    {content}
  </Dialog>
);

export default Alert;
