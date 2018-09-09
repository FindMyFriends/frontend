// @flow
import { isEmpty } from 'lodash';

export const getScopeOptions = (
  state: Object,
  scope: string,
): Object => (
  state.schema[scope] ? state.schema[scope].options : {}
);

export const getScopeSchema = (
  state: Object,
  scope: string,
): Object => (
  state.schema[scope] ? state.schema[scope].schema : {}
);

export const isFetching = (
  state: Object,
  scope: string,
): boolean => (
  state.schema[scope] ? state.schema[scope].fetching : true
);

export const fetchedOptions = (state: Object, scope: string): boolean => (
  state.schema[scope] ? !isEmpty(state.schema[scope].options) : false
);

export const fetchedSchema = (state: Object, scope: string): boolean => (
  state.schema[scope] ? !isEmpty(state.schema[scope].schema) : false
);
