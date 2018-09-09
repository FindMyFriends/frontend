// @flow
import { mapValues, values, pick } from 'lodash';

export type ApiEnum = {|
  +id: ?number,
  +name: ?mixed,
|};

export type ApiRange = {|
  +minimum: ?number,
  +maximum: ?number,
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

export const emptyRange = (): ApiRange => {
  return {
    minimum: null,
    maximum: null,
  };
};

export const toEnum = (options: Object): Array<ApiEnum> => values(options);
export const toRange = (options: Object): ApiRange => pick(options, ['minimum', 'maximum']);

export const toColorEnum = (options: Object): Array<ApiColor> => (
  values(mapValues(options, (color, id) => ({
    id: parseInt(id, 10),
    name: color.name,
    hex: color.hex,
  })))
);
