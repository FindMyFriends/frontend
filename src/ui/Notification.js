// @flow
import React from 'react';
import { connect } from 'react-redux';
import { discardedMessage } from './../ui/actions';
import FlashMessage from './FlashMessage';
import Alert from './Alert';
import Confirmation from './Confirmation';

type Props = {
  content: string,
  severity: string,
  dispatch: (any) => mixed,
  action: () => mixed,
};

const Notification = ({
  content, severity, action, dispatch,
}: Props) => {
  if (!content) {
    return null;
  }

  const handleHide = () => dispatch(discardedMessage());

  if (severity === 'success') {
    return <FlashMessage onClose={handleHide} content={content} />;
  } else if (severity === 'error') {
    return <Alert onClose={handleHide} content={content} />;
  } else if (severity === 'confirmation') {
    return <Confirmation onClose={handleHide} onConfirm={action} content={content} />;
  }
  return null;
};

export default connect(state => ({
  content: state.message.content,
  severity: state.message.severity,
  action: state.message.action,
}))(Notification);
