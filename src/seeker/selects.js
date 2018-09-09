// @flow
import { isEmpty } from 'lodash';
import type { ApiEnum, ApiRange } from '../api/enum';
import * as enumSet from '../api/enum';

export const getSex = (options: Object): Array<string> => (
  !isEmpty(options) ? options.general.sex : []
);
export const getEthnicGroups = (options: Object): Array<ApiEnum> => (
  !isEmpty(options) ? enumSet.toEnum(options.general.ethnic_group) : enumSet.empty()
);

export const getBirthYears = (schema: Object): ApiRange => (
  !isEmpty(schema)
    ? enumSet.toRange(schema.properties.general.properties.birth_year)
    : enumSet.emptyRange()
);
