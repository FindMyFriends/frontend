// @flow
export const onRating = (
  classic: (Object) => mixed,
  event: Object,
) => {
  if (event.type === 'click') {
    return classic({ target: { ...event.target, value: event.rating } });
  }
  return null;
};
