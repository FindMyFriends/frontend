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
  t.deepEqual('[10,20]', validatedAge('[10,20]'));
});

test('throwing on swapped from and to age', (t) => {
  t.is(
    'Ages are swapped',
    t.throws(() => { validatedAge('[20,10]'); }).message,
  );
});

test('keeping structure on validatedDemand', (t) => {
  t.deepEqual(
    {
      general: {
        race: 'european',
        age: '[10,20]',
        gender: 'man',
      },
    },
    validatedDemand(
      {
        general: {
          race: 'european',
          age: '[10,20]',
          gender: 'man',
        },
      },
      { genders: ['man', 'woman'], races: ['european', 'asian'] },
    ),
  );
});
