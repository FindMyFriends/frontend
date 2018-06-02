import axios from 'axios';
import lscache from 'lscache';
import trim from 'trim-character';

// TODO: Must be stored inside redux

const setExpiration = (uri: string) => lscache.set(`${uri}-ttl`, true, 10);

const download = (uri: string) => {
  setExpiration(uri);
  return axios.get(uri)
    .then((response) => {
      lscache.set(uri, { schema: response.data, etag: trim.left(response.headers.etag, 'W/') });
    });
};

const item = (uri: string) => lscache.get(uri);
const exists = (uri: string) => item(uri);
const etag = (uri: string) => item(uri).etag;
const schema = (uri: string) => item(uri).schema;
const expired = (uri: string) => !item(`${uri}-ttl`);

export const loadSchema = (uri: string) => {
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

export const loadOptions = (uri: string) => {
  return axios.options(uri)
    .then(response => response.data);
};