// @flow
import axios from 'axios';

export const track = (
  id: string,
  location: Object,
) => {
  axios.post(
    `/evolutions/${id}/locations`,
    location,
  );
};
