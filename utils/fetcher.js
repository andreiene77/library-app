const { default: router } = require('next/router');

const Axios = require('axios').default;

const getter = (url, token) =>
  Axios.get(url, {
    baseURL: 'http://localhost:3000',
    headers: {
      authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 403) router.push('/unauthorized');
        if (e.response.status === 404) router.push('/not_found');
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
    });
const poster = (url, body, token) =>
  Axios.post(url, body, { headers: { authorization: `bearer ${token}` } })
    .then((res) => res.data)
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 403) router.push('/unauthorized');
        if (e.response.status === 404) router.push('/not_found');
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
    });
const putter = (url, body, token) =>
  Axios.put(url, body, { headers: { authorization: `bearer ${token}` } })
    .then((res) => res.data)
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 403) router.push('/unauthorized');
        if (e.response.status === 404) router.push('/not_found');
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
    });
const destroyer = (url, token) =>
  Axios.delete(url, { headers: { authorization: `bearer ${token}` } })
    .then((res) => res.data)
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 403) router.push('/unauthorized');
        if (e.response.status === 404) router.push('/not_found');
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
    });

module.exports = { getter, poster, putter, destroyer };
