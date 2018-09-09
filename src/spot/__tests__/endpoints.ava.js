import test from 'ava';
import { forgottenSpots, movedSpots, newSpots } from '../endpoints';

test('selecting spots without id', (assert) => {
  const spots = [
    { coordinates: { latitude: 50, longitude: 40 } },
    { id: 1, coordinates: { latitude: 51, longitude: 41 } },
    { coordinates: { latitude: 50, longitude: 40 } },
    { id: 2, coordinates: { latitude: 52, longitude: 42 } },
    { coordinates: { latitude: 51, longitude: 41 } },
  ];
  assert.deepEqual(
    [
      { coordinates: { latitude: 50, longitude: 40 } },
      { coordinates: { latitude: 50, longitude: 40 } },
      { coordinates: { latitude: 51, longitude: 41 } },
    ],
    newSpots(spots),
  );
});

test('forgotten spots', (assert) => {
  const stored = [
    { id: 1, coordinates: { latitude: 51, longitude: 41 } },
    { id: 2, coordinates: { latitude: 52, longitude: 42 } },
    { id: 3, coordinates: { latitude: 53, longitude: 43 } },
  ];
  const passed = [
    { id: 1, coordinates: { latitude: 51, longitude: 41 } },
    { id: 3, coordinates: { latitude: 53, longitude: 43 } },
    { coordinates: { latitude: 53, longitude: 43 } },
  ];
  assert.deepEqual(
    [
      { id: 2, coordinates: { latitude: 52, longitude: 42 } },
    ],
    forgottenSpots(passed, stored),
  );
});

test('moved spots', (assert) => {
  const stored = [
    { id: 1, coordinates: { latitude: 51, longitude: 41 } },
    { id: 2, coordinates: { latitude: 52, longitude: 42 } },
    { id: 3, coordinates: { latitude: 53, longitude: 43 } },
  ];
  const passed = [
    { id: 1, coordinates: { latitude: 10, longitude: 20 } },
    { id: 3, coordinates: { latitude: 30, longitude: 40 } },
    { coordinates: { latitude: 53, longitude: 43 } },
  ];
  assert.deepEqual(
    [
      { id: 1, coordinates: { latitude: 10, longitude: 20 } },
      { id: 3, coordinates: { latitude: 30, longitude: 40 } },
    ],
    movedSpots(passed, stored),
  );
});

// TODO: it would be good to be implemented
// test('moved spots with data diff', (assert) => {
//   const stored = [
//     { id: 1, coordinates: { latitude: 51, longitude: 41 } },
//     { id: 2, coordinates: { latitude: 52, longitude: 42 } },
//     { id: 3, coordinates: { latitude: 53, longitude: 43 } },
//   ];
//   const passed = [
//     { id: 1, coordinates: { latitude: 10, longitude: 10 } },
//     { id: 3, coordinates: { latitude: 53, longitude: 43 } },
//     { coordinates: { latitude: 53, longitude: 43 } },
//   ];
//   assert.deepEqual(
//     [
//       { id: 1, coordinates: { latitude: 10, longitude: 10 } },
//     ],
//     movedSpots(passed, stored),
//   );
// });
