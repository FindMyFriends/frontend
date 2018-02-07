import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

const FlashMessage = ({ content, onClose }) => (
  <Snackbar open message={content} autoHideDuration={4000} onRequestClose={onClose} />
);

FlashMessage.propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default FlashMessage;
