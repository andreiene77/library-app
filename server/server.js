const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const container = require('./DIContainer');

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: true });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = container.get('server');
    server.use(express.json());
    server.use(
      fileUpload({
        createParentPath: true,
      }),
    );
    server.use(morgan('dev'));

    server.use(container.get('booksController'));
    server.use(container.get('usersController'));
    server.use(container.get('actionsController'));
    // const db = container.get('db');

    // container.get('proofsController');
    // container.get('placesController');

    // server.get('/seed', (req, res) => {
    //   db.seed();
    //   res.sendStatus(200);
    // });
    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
