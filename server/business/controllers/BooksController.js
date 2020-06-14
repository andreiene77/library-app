const { Sequelize } = require('sequelize');

module.exports = (server, db) => {
  server.get('/books', async (_req, res) => {
    try {
      const Books = db.model('book');
      res.json(await Books.findAll());
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.get('/books/:name/:author', async (req, res) => {
    try {
      const Books = db.model('book');
      res.json(
        await Books.findAll({
          where: {
            name: {
              [Sequelize.Op.like]: `%${req.params.name}%`,
            },
            author: { [Sequelize.Op.like]: `%${req.params.author}%` },
          },
        }),
      );
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.post('/books', async (req, res) => {
    try {
      const Books = db.model('book');
      const response = await Books.create(req.body);
      res.json(response);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.put('/books', async (req, res) => {
    try {
      const Books = db.model('book');
      const response = await Books.update(req.body, { where: { id: req.body.id } });
      if (parseInt(response, 10) !== 1)
        console.error(`Updated ${response} books, because of multiple rows with same id`);
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

  server.delete('/books', async (req, res) => {
    try {
      const Books = db.model('book');
      const response = await Books.destroy({ where: { id: req.body.id } });
      if (parseInt(response, 10) !== 1)
        console.error(`Deleted ${response} books, because of multiple rows with same id`);
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
