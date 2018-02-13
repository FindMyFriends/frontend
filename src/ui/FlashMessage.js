// @flow
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

type Props = {
  content: string,
  onClose: () => mixed,
};

const FlashMessage = ({ content, onClose }: Props) => (
  <Snackbar open message={content} autoHideDuration={4000} onRequestClose={onClose} />
);

export default FlashMessage;
