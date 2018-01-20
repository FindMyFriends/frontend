import test from 'ava';
import { replaceNull } from './../src/schema';

test('replacing null to string', (t) => {
  t.deepEqual(
    ['a', 'b', 'c'],
    replaceNull(['a', 'b', null], 'c'),
  );
});
