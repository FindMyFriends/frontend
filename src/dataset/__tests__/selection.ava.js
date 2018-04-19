import test from 'ava';
import { twoSideSort } from './../selection';

test('adding first with +', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { },
      { position: 'position' },
    ),
  );
});

test('rewriting', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { foo: 'bar' },
      { position: 'position' },
    ),
  );
});

test('changing side from - to +', (t) => {
  t.deepEqual(
    {
      position: '+position',
    },
    twoSideSort(
      { position: '-position' },
      { position: 'position' },
    ),
  );
  t.deepEqual(
    {
      position: '-position',
    },
    twoSideSort(
      { position: '+position' },
      { position: 'position' },
    ),
  );
});
