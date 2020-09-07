/* eslint-disable no-unused-vars */
const readXlsxFile = require('read-excel-file/node');
const Repository = require('../../data/Repository');

class BooksService {
  /**
   *Creates an instance of BooksService.
   * @param {Repository} repo
   * @memberof BooksService
   */
  constructor(repo) {
    this.repo = repo;
  }

  getAll() {
    return this.repo.getAll();
  }

  async getBlockedBooks() {
    const book = await this.repo.getOne({ _id: id });
    if (!book) return null;
    return book.blockedBooks || new Map();
  }

  /**
   * @param {String} name
   * @param {String} author
   * @memberof BooksService
   */
  async getBookByNameAuthor(name, author) {
    const book = await this.repo.getOne({
      name: { $regex: `.*${name}.*`, $options: 'i' },
      author: { $regex: `.*${author}.*`, $options: 'i' },
    });
    if (!book) return null;
    return book;
  }

  getBookByWord(word) {
    return this.repo.getMany({
      $or: [
        {
          name: { $regex: `.*${word}.*`, $options: 'i' },
        },
        { author: { $regex: `.*${word}.*`, $options: 'i' } },
        { publHouse: { $regex: `.*${word}.*`, $options: 'i' } },
        { genre: { $regex: `.*${word}.*`, $options: 'i' } },
      ],
    });
  }

  async saveBook({ code, name, author, publHouse, year, genre, copies, place = null }) {
    const book = await this.repo.getOne({ code });
    console.log('BooksService -> saveBook -> found duplicate book', book);
    if (book) return null;
    return this.repo.save({
      code,
      name,
      author,
      publHouse,
      year,
      genre,
      copies,
      place,
      actions: [],
    });
  }

  async bulkSaveBook(fileName) {
    const schema = {
      Code: {
        prop: 'code',
        type: String,
        required: true,
      },
      Title: {
        prop: 'name',
        type: String,
        required: true,
      },
      Author: {
        prop: 'author',
        type: String,
        required: true,
      },
      'Publishing House': {
        prop: 'publHouse',
        type: String,
      },
      'Publishing Year': {
        prop: 'year',
        type: Number,
      },
      Genre: {
        prop: 'genre',
        type: String,
      },
      'No. Copies': {
        prop: 'copies',
        type: Number,
      },
    };
    readXlsxFile(`./uploads/${fileName}`, { schema }).then(({ rows, errors }) => {
      this.repo.saveMany(rows);
    });
  }

  async updateBook({ id, code, name, author, publHouse, year, genre, copies }) {
    const { nModified } = await this.repo.update({ _id: id }, { code, name, author, publHouse, year, genre, copies });
    if (parseInt(nModified, 10) !== 1)
      console.error(`Updated ${nModified} books, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async deleteBook(id) {
    const { deletedCount } = await this.repo.remove({ _id: id });
    if (parseInt(deletedCount, 10) !== 1)
      console.error(`Deleted ${deletedCount} books, because of multiple rows with same id`);
    if (parseInt(deletedCount, 10) === 0) throw new Error('Nothing deleted');
  }
}

module.exports = BooksService;
