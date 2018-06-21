// @flow

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
