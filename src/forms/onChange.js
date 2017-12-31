import { id as enumId } from './../enum';

export const onSelectChange = (classic, name) => (event, index, value) => {
  return classic({ target: { name, value } });
};

export const onSelectEnumChange = (classic, name, selection) => (event, index, value) => {
  return classic({ target: { name, value: enumId(value, selection.id, selection.name) } });
};
