import test from 'ava';
import { validatedGender, validatedRace, validatedAge, validatedDemand } from './../../src/demands/rules';

test('passing with allowed gender', (t) => {
  t.deepEqual('man', validatedGender('man', ['man', 'woman']));
});

test('throwing on unknown gender', (t) => {
  t.is(
    'Gender idk is not allowed',
    t.throws(() => { validatedGender('idk', ['man', 'woman']); }).message,
  );
});

test('passing with allowed race', (t) => {
  t.deepEqual('european', validatedRace('european', ['european', 'asian']));
});

test('throwing on unknown race', (t) => {
  t.is(
    'Race idk is not allowed',
    t.throws(() => { validatedRace('idk', ['european', 'asian']); }).message,
  );
});

test('passing with allowed age', (t) => {
  t.deepEqual(20, validatedAge(20, { from: 15, maximum: 130 }));
});

test('throwing on too old or too young age', (t) => {
  t.is(
    'Age must be in range from 15 to 130',
    t.throws(() => { validatedAge(11, { minimum: 15, maximum: 130 }); }).message,
  );
  t.is(
    'Age must be in range from 15 to 130',
    t.throws(() => { validatedAge(140, { minimum: 15, maximum: 130 }); }).message,
  );
});

test('keeping structure on validatedDemand', (t) => {
  t.deepEqual(
    {
      general: {
        race: 'european',
        age: 20,
        gender: 'man',
      },
    },
    validatedDemand(
      {
        general: {
          race: 'european',
          age: 20,
          gender: 'man',
        },
      },
      { genders: ['man', 'woman'], races: ['european', 'asian'], ages: { minimum: 15, maximum: 130 } },
    ),
  );
});
