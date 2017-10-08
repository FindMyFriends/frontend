export const authorized = () => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TEST',
  },
});

export const unauthorized = () => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
