/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { BOOKS_ROUTE } = require('../../../utils/apiRoutes');
const BooksService = require('../services/BooksService');

const { GET, POST, PUT, DELETE } = BOOKS_ROUTE;
/**
 * @param {Router} router
 * @param {BooksService} service
 */
module.exports = function BookController(router, service, { authenticateToken, adminOnly }) {
  router.get(GET.ALL(), async (_req, res) => {
    try {
      const books = await service.getAll();
      return res.json(
        books.map(({ _id: id, code, name, author, publHouse, year, genre, copies, place, blockedBooks }) => ({
          id,
          code,
          name,
          author,
          publHouse,
          year,
          genre,
          copies,
          place: `${place.room} - ${place.drawer}/${place.row}`,
          blockedBooks,
        })),
      );
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

  router.get(GET.BLOCKED_BOOKS(':id'), authenticateToken, async (req, res) => {
    try {
      const blockedBooks = await service.getBlockedBooks(req.params.id);
      if (blockedBooks === null) res.sendStatus(400);
      res.json(blockedBooks);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.get(GET.BY_NAME_AUTHOR(':name', ':author'), authenticateToken, async (req, res) => {
    try {
      const book = await service.getBookByNameAuthor(req.params.name, req.params.author);
      if (book === null) res.sendStatus(400);
      res.json(book);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.get(GET.BY_WORD(':word'), authenticateToken, async (req, res) => {
    try {
      res.json(await service.getBookByWord(req.params.word));
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post(POST.ONE(), authenticateToken, adminOnly, async (req, res) => {
    try {
      const book = await service.saveBook(req.body);
      if (book === null) res.sendStatus(400);
      else res.json(book);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post(POST.MANY(), authenticateToken, adminOnly, async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: 400,
          message: 'No file uploaded',
        });
      } else {
        const file = req.files.books;

        file.mv(`./uploads/${file.name}`);

        await service.bulkSaveBook(file.name);

        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
          },
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  router.put(PUT(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.updateBook(req.body);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.delete(DELETE(':id'), async (req, res) => {
    try {
      await service.deleteBook(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  return router;
};
