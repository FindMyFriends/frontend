import test from 'ava';
import toRequest from './../../src/demands/toRequest';

test('transforming to request', (t) => {
  t.deepEqual(
    {
      general: {
        race: 'european',
        birth_year: '[10,20)',
        gender: 'man',
      },
    },
    toRequest({
      general_race: 'european',
      general_birth_year_from: 10,
      general_birth_year_to: 20,
      general_gender: 'man',
    }),
  );
});

test('ingoring missing field', (t) => {
  t.deepEqual(
    {
      general: {
        race: undefined,
        birth_year: '[,)',
        gender: 'man',
      },
    },
    toRequest({
      general_gender: 'man',
    }),
  );
});
