const express = require('express');
const next = require('next');
const db = require('./data/db');

const BooksController = require('./business/controllers/BooksController');
const UsersController = require('./business/controllers/UsersController');
const ActionsController = require('./business/controllers/ActionsController');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());

    UsersController(server, db);
    BooksController(server, db);
    ActionsController(server, db);

    server.post('/seed', (req, res) => {
      db.seed();
      res.sendStatus(200);
    });
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
