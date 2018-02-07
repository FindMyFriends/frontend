export const RECEIVED_API_ERROR = 'RECEIVED_API_ERROR';
export const DISCARDED_ERROR = 'DISCARDED_ERROR';

export const receivedApiError = error => ({
  type: RECEIVED_API_ERROR,
  message: error.response.data.message,
});

export const discardedError = () => ({
  type: DISCARDED_ERROR,
  message: null,
});
