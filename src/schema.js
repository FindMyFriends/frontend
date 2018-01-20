import axios from 'axios';
import lscache from 'lscache';
import trim from 'trim-character';

const setExpiration = uri => lscache.set(`${uri}-ttl`, true, 10);

const download = (uri) => {
  setExpiration(uri);
  return axios.get(uri)
    .then(response => lscache.set(uri, { schema: response.data, etag: trim.left(response.headers.etag, 'W/') }));
};

const item = uri => lscache.get(uri);
const exists = uri => item(uri);
const etag = uri => item(uri).etag;
const schema = uri => item(uri).schema;
const expired = uri => !item(`${uri}-ttl`);

const load = (uri) => {
  lscache.flushExpired();
  if (!exists(uri)) {
    return download(uri);
  } else if (expired(uri)) {
    axios.head(uri, { headers: { 'if-match': etag(uri) } })
      .then(() => setExpiration(uri))
      .catch(() => download(uri));
  }
  return Promise.resolve(schema(uri));
};

export const replaceNull = (values, replacement) => {
  const index = values.indexOf(null);
  if (index !== -1) {
    const v = values;
    v[index] = replacement;
    return v;
  }
  return values;
};

export default load;
