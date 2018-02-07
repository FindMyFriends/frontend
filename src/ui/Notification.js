import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { discardedMessage } from './../ui/actions';
import FlashMessage from './FlashMessage';
import Alert from './Alert';

const Notification = ({ content, severity, dispatch }) => {
  if (!content) {
    return null;
  }

  const handleHide = () => dispatch(discardedMessage());

  if (severity === 'success') {
    return <FlashMessage onClose={handleHide} content={content} />;
  } else if (severity === 'error') {
    return <Alert onClose={handleHide} content={content} />;
  }
  return null;
};

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.string,
  severity: PropTypes.string,
};

export default connect(state => ({
  content: state.message.content,
  severity: state.message.severity,
}))(Notification);
