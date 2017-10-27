import test from 'ava';
import { validatedGender, validatedRace, validatedBirthYear, validatedDemand } from './../../src/demands/rules';

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

test('passing with allowed birth year', (t) => {
  t.deepEqual('[1996,1997]', validatedBirthYear('[1996,1997]'));
});

test('throwing on swapped from and to birth year', (t) => {
  t.is(
    'Years are swapped',
    t.throws(() => { validatedBirthYear('[1997,1996]'); }).message,
  );
});

test('throwing on too old or too young birth year', (t) => {
  t.is(
    `Years must be in range from 1800 to ${(new Date()).getFullYear()}`,
    t.throws(() => { validatedBirthYear('[1700,1996]'); }).message,
  );
  t.is(
    `Years must be in range from 1800 to ${(new Date()).getFullYear()}`,
    t.throws(() => { validatedBirthYear('[1996,2222]'); }).message,
  );
});

test('keeping structure on validatedDemand', (t) => {
  t.deepEqual(
    {
      general: {
        race: 'european',
        birth_year: '[1996,1997]',
        gender: 'man',
      },
    },
    validatedDemand(
      {
        general: {
          race: 'european',
          birth_year: '[1996,1997]',
          gender: 'man',
        },
      },
      { genders: ['man', 'woman'], races: ['european', 'asian'] },
    ),
  );
});
