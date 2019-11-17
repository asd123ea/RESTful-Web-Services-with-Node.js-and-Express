const express = require('express');
const bookController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.use('/books/:bookId', controller.getById);
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteA);

  return bookRouter;
}

module.exports = routes;