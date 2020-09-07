const { connect, connection } = require('mongoose');
const { collection } = require('./models/Book');
const Book = require('./models/Book');
const rooms = require('../../utils/rooms');

connect('mongodb://andreiene:pass@localhost', { useNewUrlParser: true, dbName: 'library' });
const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log(' >> Connection to db successful!');
});

db.seed = async () => {
  // const books = await Book.find({});
  // // const getRandVal = (obj) => Object.values(obj)[Math.floor(Math.random() * Math.floor(Object.values(obj).length))];
  // books.forEach(async (book) => {
  //   await Book.updateOne(book, {
  //     copies: Math.floor(Math.random() * Math.floor(10)) + 1,
  //   });
  // });
};

module.exports = db;
