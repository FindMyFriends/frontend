// @flow
import { options as schemaOptions } from '../schema/endpoints';

export const DESCRIPTION = 'DESCRIPTION';

export const options = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaOptions('/descriptions', DESCRIPTION));
};
