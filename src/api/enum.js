// @flow
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
