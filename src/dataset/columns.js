// @flow
export const dotsToValue = (column: string, source: Object): Object => column.split('.').reduce((object, key) => object[key], source);
