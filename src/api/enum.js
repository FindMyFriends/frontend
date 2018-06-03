// @flow
// TODO: shit
export const combined = (keys: [any], values: [any]): Object => {
  return keys.reduce((map, key, index) => {
    return {
      ...map,
      [key]: values[index],
    };
  }, { });
};

export const id = (
  name: string,
  ids: any,
  names: any,
): number => parseInt(combined(names, ids)[name], 10);
export const name = (id: number, ids: any, names: any): Object => combined(ids, names)[id];

export const empty = (): Object => {
  return {
    id: [],
    name: [],
  };
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
