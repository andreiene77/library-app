module.exports = (server, db) => {
  server.get('/actions', async (_req, res) => {
    try {
      const Actions = db.model('action');
      res.json(await Actions.findAll());
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.get('/actions/:userId', async (req, res) => {
    try {
      const actions = await db.model('user').findByPk(req.params.userId).getActions();
      console.log('actions', actions);
      res.json(actions);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.post('/actions/:userId.:bookId', async (req, res) => {
    try {
      const Actions = db.model('action');
      const actionData = { ...req.body, confirmed: false, deadline: new Date() };
      const action = await Actions.create(actionData);
      const User = db.model('user');
      const Book = db.model('book');
      action.setUser(await User.findByPk(req.params.userId));
      action.setBook(await Book.findByPk(req.params.bookId));
      res.json(action);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.put('/actions', async (req, res) => {
    try {
      const Actions = db.model('action');
      const response = await Actions.update(req.body, { where: { id: req.body.id } });
      if (parseInt(response, 10) !== 1)
        console.error(`Updated ${response} actions, because of multiple rows with same id`);
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

  server.delete('/actions', async (req, res) => {
    try {
      const Actions = db.model('action');
      const response = await Actions.destroy({ where: { id: req.body.id } });
      if (parseInt(response, 10) !== 1)
        console.error(`Deleted ${response} actions, because of multiple rows with same id`);
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(500);
    }
  });

  // server.all('/booking')
  // server.all('/borrow')
  // server.all('/return')
};
