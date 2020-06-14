const { Sequelize, DataTypes } = require('sequelize');
const models = require('./models');

const sequelize = new Sequelize('library', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const addBooksToTable = () => {
  sequelize.model('book').bulkCreate([
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'SToaB2',
      name: 'Some Interesting Book',
      author: 'Some interesting awesome author',
      publHouse: 'some big publishing house',
      year: '2005',
      genre: 'drama',
      copies: 1301,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
    {
      code: 'AToaB2',
      name: 'Another Interesting Book',
      author: 'Another interesting awesome author',
      publHouse: 'another big publishing house',
      year: '2007',
      genre: 'drama',
      copies: 2302,
    },
  ]);
};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })
  .then(() => {
    console.log('Initialize db.');
    Object.values(models).forEach((modelObject) => modelObject({ sequelize, DataTypes }));
    Object.values(sequelize.models).forEach((model) => model.associate && model.associate(sequelize.models));
    sequelize.sync({ force: true });
    sequelize.seed = addBooksToTable;
  });

module.exports = sequelize;
