// @flow
import axios from 'axios';

export const track = (
  id: string,
  spot: Object,
) => {
  axios.post(
    `/evolutions/${id}/spots`,
    spot,
  );
};
