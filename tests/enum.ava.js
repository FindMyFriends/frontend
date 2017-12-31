import test from 'ava';
import { combined } from './../src/enum';

test('combining key and value', (t) => {
  t.deepEqual(
    {
      a: 1,
      b: 2,
    },
    combined(['a', 'b'], [1, 2]),
  );
});

test('allowing empty combination', (t) => {
  t.deepEqual({}, combined([], []));
});
