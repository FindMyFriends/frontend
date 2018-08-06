// @flow
import axios from 'axios';

export const track = (
  id: string,
  spots: Array<Object>,
) => {
  spots.forEach((spot: Object) => {
    axios.post(
      `/evolutions/${id}/spots`,
      spot,
    );
  });
};
