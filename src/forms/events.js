import { id as enumId } from './../enum';

export const onSelectChange = (classic, name) => (event, index, value) => {
  return classic({ target: { name, value } });
};

export const onSelectEnumChange = (classic, name, selection) => (event, index, value) => {
  return classic({ target: { name, value: enumId(value, selection.id, selection.name) } });
};

export const onSlideChange = (classic, name) => (self, value) => {
  return classic({ target: { name, value } });
};

export const onRangeChange = (classic, names) => (range) => {
  classic({ target: { name: names[0], value: range[0] } });
  classic({ target: { name: names[1], value: range[1] } });
};

export const onCheck = (classic, name) => (self, checked) => {
  return classic({ target: { name, value: checked } });
};
