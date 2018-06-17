// @flow
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import range from 'lodash/range';

export type ApiEnum = {|
  +id: ?number,
  +name: ?mixed,
|};

export type ApiColor = {|
  +id: ?number,
  +hex: ?string,
  +name: ?string,
|};

export const empty = (): Array<ApiEnum> => {
  return [
    {
      id: null,
      name: null,
    },
  ];
};

export const emptyColor = (): Array<ApiColor> => {
  return [
    {
      id: null,
      hex: null,
      name: null,
    },
  ];
};

export const emptyRange = (): Array<number> => range(0, 11);

export const toEnum = (options: Object): Array<ApiEnum> => (
  values(mapValues(options, (name, id) => ({ id: parseInt(id, 10), name })))
);

export const toColorEnum = (options: Object): Array<ApiColor> => (
  values(mapValues(options, (color, id) => ({
    id: parseInt(id, 10),
    name: color.name,
    hex: color.hex,
  })))
);
