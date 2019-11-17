const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it(`should not allow an empty title on post`, () => {
      const Book = function (book) { this.save = () => { } };
      const req = {
        body: {
          author: 'Bck'
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status.calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);

      res.send.calledWith('Title is required')
        .should.equal(true);
    });
  });
  describe('Get by id', () => {
    it('should return a book', () => {
      const Book = function (book) { this.getById = (id) => { } };
      const req = {
        params: [{
          bookId: '5dd18216a506adf95f494690'
        }]
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = bookController(Book);
      controller.getById(req, res);

      res.status.calledWith(200).should.equal(true, 'Book returned');
    })
  });

});