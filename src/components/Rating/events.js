// @flow
export const onRating = (
  classic: (Object) => mixed,
  name: string,
  event: Object,
) => {
  if (event.type === 'click') {
    return classic({ target: { name, value: event.rating } });
  }
  return null;
};
