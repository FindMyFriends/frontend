// @flow
import { options as schemaOptions, schema as schemaStructure } from '../schema/endpoints';

export const DESCRIPTION = 'DESCRIPTION';

export const options = () => (dispatch: (mixed) => Object) => dispatch(schemaOptions('/descriptions', DESCRIPTION));
export const schema = () => (dispatch: (mixed) => Object) => dispatch(schemaStructure('/schema/description/get.json', DESCRIPTION));
