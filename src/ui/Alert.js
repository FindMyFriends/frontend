import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Alert = ({ content, onClose }) => (
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

Alert.propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
