export const RECEIVED_API_ERROR = 'RECEIVED_API_ERROR';
export const DISCARDED_MESSAGE = 'DISCARDED_MESSAGE';
export const RECEIVED_SUCCESS = 'RECEIVED_SUCCESS';

export const receivedApiError = error => ({
  type: RECEIVED_API_ERROR,
  content: error.response.data.message,
  severity: 'error',
});

export const receivedSuccess = content => ({
  type: RECEIVED_SUCCESS,
  content,
  severity: 'success',
});

export const discardedMessage = () => ({
  type: DISCARDED_MESSAGE,
  content: null,
  severity: null,
});
