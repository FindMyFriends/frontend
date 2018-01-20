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

export const onRangeChange = (classic, name, ranges) => (range) => {
  classic({ target: { name, value: { [ranges[0]]: range[0], [ranges[1]]: range[1] } } });
};

export const onCheck = (classic, name) => (self, checked) => {
  return classic({ target: { name, value: checked } });
};
