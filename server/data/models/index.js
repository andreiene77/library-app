/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const normalizedPath = require('path').join(__dirname, '/');

require('fs')
  .readdirSync(normalizedPath)
  .forEach((file) => {
    if (file !== 'index.js') module.exports[file.replace('.js', '')] = require(`./${file}`);
  });
