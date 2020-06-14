module.exports = (server, db) => {
  server.post('/login', (req, res) => {
    const Users = db.model('user');
    Users.findOne({ where: { username: req.body.username } }).then((user) => {
      if (!user) return res.sendStatus(404);
      if (user && !user.isAdmin) return res.sendStatus(401);
      if (user && user.password !== req.body.password) return res.sendStatus(401);
      return res.json(user);
    });
  });

  server.post('/register', (req, res) => {
    const Users = db.model('user');
    Users.findOne({ where: { username: req.body.username } }).then(async (user) => {
      if (user) return res.sendStatus(400);
      const newUserData = { ...req.body, isAdmin: false, email: '' };
      const newUser = await Users.create(newUserData);
      return res.json(newUser);
    });
  });

  server.get('/users', async (_req, res) => {
    const Users = db.model('user');
    const usersList = await Users.findAll();
    res.json(
      usersList.map(({ id, username, email, firstName, lastName, isAdmin }) => ({
        id,
        username,
        email,
        firstName,
        lastName,
        isAdmin,
      })),
    );
  });

  server.get('/users/:userId', (req, res) => {
    const Users = db.model('user');
    Users.findByPk(req.params.userId).then((user) => {
      if (!user) return res.sendStatus(404);
      if (user && user.password !== req.body.password) return res.sendStatus(401);
      return res.json(user);
    });
  });

  server.post('/users', async (req, res) => {
    try {
      // Verify if duplicate
      const Users = db.model('user');
      const response = await Users.create(req.body);
      res.json(response);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.put('/users', async (req, res) => {
    const Users = db.model('user');
    try {
      const response = await Users.update(req.body, { where: { id: req.body.id } });
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      if (parseInt(response, 10) !== 1)
        console.error(`Updated ${response} users, because of multiple rows with same id`);
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.delete('/users', async (req, res) => {
    const Books = db.model('book');
    try {
      const response = await Books.destroy({ where: { id: req.body.id } });
      if (parseInt(response, 10) === 0) return res.sendStatus(404);
      if (parseInt(response, 10) !== 1)
        console.error(`Deleted ${response} books, because of multiple rows with same id`);
      return res.sendStatus(200);
    } catch (e) {
      return res.sendStatus(404);
    }
  });
};
