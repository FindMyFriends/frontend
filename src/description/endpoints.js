// @flow
import { schema as schemaStructure } from '../schema/endpoints';

export const DESCRIPTION = 'DESCRIPTION';

export const schema = () => (dispatch: (mixed) => Object) => {
  dispatch(schemaStructure('/schema/description/get.json', DESCRIPTION));
};
