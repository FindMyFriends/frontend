// @flow

export type Age = {|
  +from: number,
  +to: number,
|};

export type BirthYear = {|
  ...Age,
|};

export type UnitValue = {|
  +unit: ?string,
  +value: ?number,
|};
