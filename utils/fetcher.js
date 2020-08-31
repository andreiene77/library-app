const Axios = require('axios');

const getter = (url, token) =>
  Axios.get(url, {
    baseURL: 'http://localhost:3000',
    headers: {
      authorization: `bearer ${token}`,
    },
  }).then((res) => res.data);
const poster = (url, body, token) =>
  Axios.post(url, body, { headers: { authorization: `bearer ${token}` } }).then((res) => res.data);
const putter = (url, body, token) =>
  Axios.put(url, body, { headers: { authorization: `bearer ${token}` } }).then((res) => res.data);
const destroyer = (url, token) =>
  Axios.delete(url, { headers: { authorization: `bearer ${token}` } }).then((res) => res.data);

module.exports = { getter, poster, putter, destroyer };
