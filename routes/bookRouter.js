const express = require('express');
const bookController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteA);

  return bookRouter;
}

module.exports = routes;