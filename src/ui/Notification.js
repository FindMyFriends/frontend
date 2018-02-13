// @flow
import React from 'react';
import { connect } from 'react-redux';
import { discardedMessage } from './../ui/actions';
import FlashMessage from './FlashMessage';
import Alert from './Alert';

type Props = {
  content: string,
  severity: string,
  dispatch: (any) => mixed,
};

const Notification = ({ content, severity, dispatch }: Props) => {
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

export default connect(state => ({
  content: state.message.content,
  severity: state.message.severity,
}))(Notification);
