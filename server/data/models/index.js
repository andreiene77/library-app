require('fs')
  .readdirSync(__dirname)
  .forEach((file) => {
    if (file !== 'index.js') {
      const moduleName = file.split('.')[0];
      exports[moduleName] = require(`./${moduleName}`);
    }
  });

// const normalizedPath = require('path').join(__dirname, '/');
