const { connect, connection } = require('mongoose');

connect('mongodb://andreiene:pass@localhost', { useNewUrlParser: true, dbName: 'library' });
const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log(' >> Connection to db successful!');
});

// db.seed = () => {
//   const usersModels = usersSeed.map((user) => new User(user));
//   collection.insertMany(usersModels, (e, users) => {
//     if (e) return console.error(` >> couldn't save the ${users.insertedCount} users`, e);
//     return console.log(` >> ${users.insertedCount} users saved successfully`);
//   });
//   const booksModels = booksSeed.map((book) => new Book(book));
//   _collection.insertMany(booksModels, (e, books) => {
//     if (e) return console.error(` >> couldn't save the ${books.insertedCount} books`, e);
//     return console.log(` >> ${books.insertedCount} books saved successfully`);
//   });
// };

module.exports = db;
