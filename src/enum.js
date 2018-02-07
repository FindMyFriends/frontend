export const combined = (keys, values) => {
  return keys.reduce((map, key, index) => {
    return {
      ...map,
      [key]: values[index],
    };
  }, { });
};

export const id = (name, ids, names) => combined(names, ids)[name];
export const name = (id, ids, names) => combined(ids, names)[id];

export const empty = () => {
  return {
    id: [],
    name: [],
  };
};

export const emptyColor = () => {
  return {
    0: {
      hex: null,
      name: null,
    },
  };
};

export const emptyRange = () => {
  return {
    minimum: 0,
    maximum: 10,
  };
};
