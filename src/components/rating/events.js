// @flow
export const onRating = (
  classic: (x: Object) => mixed,
  name: string,
  event: Object,
) => {
  if (event.type === 'click') {
    return classic({ target: { name, value: event.rating } });
  }
  return null;
};
