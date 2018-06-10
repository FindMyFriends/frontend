// @flow
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';

type ApiEnum = {|
  +id: ?number,
  +name: ?mixed,
|};

export const empty = (): Array<ApiEnum> => {
  return [
    {
      id: null,
      name: null,
    },
  ];
};

export const emptyColor = (): Array<Object> => {
  return [
    {
      hex: null,
      name: null,
    },
  ];
};

export const emptyRange = (): Object => {
  return {
    minimum: 0,
    maximum: 10,
  };
};

export const toEnum = (options: Object): Array<ApiEnum> => (
  values(mapValues(options, (name, id) => ({ id: parseInt(id, 10), name })))
);
