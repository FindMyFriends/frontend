import test from 'ava';
import toRequest from './../../src/demands/toRequest';

test('transforming to request', (t) => {
  t.deepEqual(
    {
      general: {
        race: 'european',
        age: '[10,20)',
        gender: 'man',
      },
    },
    toRequest({
      general_race: 'european',
      general_age_from: 10,
      general_age_to: 20,
      general_gender: 'man',
    }),
  );
});

test('ingoring missing field', (t) => {
  t.deepEqual(
    {
      general: {
        race: undefined,
        age: '[,)',
        gender: 'man',
      },
    },
    toRequest({
      general_gender: 'man',
    }),
  );
});
