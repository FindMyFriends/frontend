// @flow
import { id as enumId } from './../enum';

export const onSelectChange = (
  classic: (x: Object) => any,
  name: string,
) => (event: Object, index: any, value: any) => {
  return classic({ target: { name, value } });
};

export const onSelectEnumChange = (
  classic: (x: Object) => any,
  name: string,
  selection: Object,
) => (event: Object, index: any, value: any) => {
  return classic({
    target: { name, value: enumId(value, Object.keys(selection), Object.values(selection)) },
  });
};

export const onSlideChange = (
  classic: (x: Object) => any,
  name: string,
) => (self: any, value: any) => {
  return classic({ target: { name, value } });
};

export const onRangeChange = (
  classic: (x: Object) => any,
  name: string, ranges: [number, number],
) => (range: [number, number]) => {
  classic({ target: { name, value: { [ranges[0]]: range[0], [ranges[1]]: range[1] } } });
};

export const onCheck = (
  classic: (x: Object) => any,
  name: string,
) => (self: any, checked: bool) => {
  return classic({ target: { name, value: checked } });
};
