/* eslint-disable no-unused-vars */
const { Types } = require('mongoose');
const Repository = require('../../data/Repository');
const actionStates = require('../../../utils/actionState');

class ActionsService {
  /**
   *Creates an instance of BooksService.
   * @param {Repository} repo
   * @param {Repository} usersRepo
   * @param {Repository} booksRepo
   * @memberof BooksService
   */
  constructor(repo, usersRepo, booksRepo) {
    this.repo = repo;
    this.usersRepo = usersRepo;
    this.booksRepo = booksRepo;
  }

  getAll() {
    return this.repo.getAll();
  }

  async getActionsByUsername(username) {
    const { _id: id } = await this.usersRepo.getOne({ username });
    const actions = await this.repo.getMany({
      user: new Types.ObjectId(id),
    });
    if (!actions) return null;
    return actions;
  }

  async getActionByUserId(id) {
    const action = await this.repo.getOne({
      user: new Types.ObjectId(id),
    });
    if (!action) return null;
    return action;
  }

  async getActionByBookId(id) {
    const action = await this.repo.getOne({
      book: new Types.ObjectId(id),
    });
    if (!action) return null;
    return action;
  }

  async saveAction({ userId, bookId, username, deadline }) {
    if (!deadline) {
      deadline = new Date();
      deadline.setDate(deadline.getDate() + 7);
    }
    deadline = new Date(deadline);
    let action = null;
    if (userId) {
      action = await this.repo.save({
        createDate: new Date(),
        lastUpdate: new Date(),
        deadline,
        state: actionStates.BOOKING_REQUESTED,
        user: new Types.ObjectId(userId),
        book: new Types.ObjectId(bookId),
      });
    } else if (username) {
      const { _id: id } = await this.usersRepo.getOne({ username });
      action = await this.repo.save({
        createDate: new Date(),
        lastUpdate: new Date(),
        deadline,
        state: actionStates.BOOKING_REQUESTED,
        user: new Types.ObjectId(id),
        book: new Types.ObjectId(bookId),
      });
    }
    if (!action) return null;
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (!book.blockedBooks) book.blockedBooks = new Map();
    for (let i = 0; i < 8; i++) {
      const key = deadline.toDateString();
      book.blockedBooks.set(key, (book.blockedBooks.get(key) || 0) + 1);
      deadline.setDate(deadline.getDate() + 1);
    }

    await this.booksRepo.update({ _id: bookId }, { $set: { blockedBooks: book.blockedBooks } });
    return action;
  }

  async updateAction({ _id, createDate, lastUpdate, deadline, state }) {
    const { nModified } = await this.repo.update(
      { _id },
      {
        createDate,
        lastUpdate,
        deadline,
        state,
      },
    );
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async _changeState(_id, state, deadline) {
    const { nModified } = await this.repo.update(
      { _id },
      deadline ? { state, lastUpdate: new Date(), deadline: new Date(deadline) } : { state, lastUpdate: new Date() },
    );
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async cancelBooking(id) {
    await this._changeState(id, actionStates.CANCELED_BY_USER);

    const { book: bookId } = await this.repo.getOne({ _id: id });
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (book) {
      const action = await this.repo.getOne({ _id: id });
      const deadline = new Date(action.deadline);
      if (!book.blockedBooks) book.blockedBooks = new Map();
      for (let i = 0; i < 8; i++) {
        const key = deadline.toDateString();
        book.blockedBooks.set(key, (book.blockedBooks.get(key) || 1) - 1);
        if (book.blockedBooks.get(key) === 0) book.blockedBooks.delete(key);
        deadline.setDate(deadline.getDate() + 1);
      }

      await this.booksRepo.update({ _id: bookId }, { $set: { blockedBooks: book.blockedBooks } });
    }
  }

  async bookingAccepted(id) {
    await this._changeState(id, actionStates.BOOKING_ACCEPTED);
  }

  async bookingDeclined(id) {
    await this._changeState(id, actionStates.BOOKING_DECLINED);

    const { book: bookId } = await this.repo.getOne({ _id: id });
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (book) {
      const action = await this.repo.getOne({ _id: id });
      const deadline = new Date(action.deadline);
      if (!book.blockedBooks) book.blockedBooks = new Map();
      for (let i = 0; i < 8; i++) {
        const key = deadline.toDateString();
        book.blockedBooks.set(key, (book.blockedBooks.get(key) || 1) - 1);
        if (book.blockedBooks.get(key) === 0) book.blockedBooks.delete(key);
        deadline.setDate(deadline.getDate() + 1);
      }

      await this.booksRepo.update({ _id: bookId }, { $set: { blockedBooks: book.blockedBooks } });
    }
  }

  async userPickUp(id) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    await this._changeState(id, actionStates.BORROWED_AWAITING, deadline);
  }

  async adminConfirmBorrow(id) {
    await this._changeState(id, actionStates.BORROWED_CONFIRMED);
  }

  async userRequestExtend(id) {
    await this._changeState(id, actionStates.BORROW_EXTEND_REQUEST);

    const action = await this.repo.getOne({ _id: id });
    const deadline = new Date(action.deadline);
    deadline.setDate(deadline.getDate() + 7);
    const { book: bookId } = await this.repo.getOne({ _id: id });
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (book) {
      if (!book.blockedBooks) book.blockedBooks = new Map();
      const key = deadline.toDateString();
      if (book.blockedBooks.get(key) === book.copies) await this._changeState(id, actionStates.BORROW_EXTEND_DECLINED);
    }
  }

  async userRequestAccepted(id) {
    const action = await this.repo.getOne({ _id: id });
    console.log('userRequestAccepted -> action.deadline', action.deadline);
    console.log('userRequestAccepted -> action.deadline type: ', typeof action.deadline);
    const deadline = new Date(action.deadline);
    deadline.setDate(deadline.getDate() + 7);
    console.log('userRequestAccepted -> deadline', deadline);

    await this._changeState(id, actionStates.BORROW_EXTEND_ACCEPTED, deadline);

    const { book: bookId } = await this.repo.getOne({ _id: id });
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (book) {
      if (!book.blockedBooks) book.blockedBooks = new Map();
      for (let i = 0; i < 7; i++) {
        const key = deadline.toDateString();
        book.blockedBooks.set(key, (book.blockedBooks.get(key) || 0) + 1);
        deadline.setDate(deadline.getDate() - 1);
      }

      await this.booksRepo.update({ _id: bookId }, { $set: { blockedBooks: book.blockedBooks } });
    }
  }

  async userRequestDeclined(id) {
    await this._changeState(id, actionStates.BORROW_EXTEND_DECLINED);
  }

  async userReturned(id) {
    await this._changeState(id, actionStates.USER_RETURNED);
  }

  async adminConfirmReturn(id) {
    await this._changeState(id, actionStates.RETURN_CONFIRMED);

    const { book: bookId } = await this.repo.getOne({ _id: id });
    const book = await this.booksRepo.getOne({ _id: bookId });
    if (book) {
      const action = await this.repo.getOne({ _id: id });
      const deadline = new Date(action.deadline);
      if (!book.blockedBooks) book.blockedBooks = new Map();
      for (let i = 0; i < 15; i++) {
        const key = deadline.toDateString();
        book.blockedBooks.set(key, (book.blockedBooks.get(key) || 1) - 1);
        if (book.blockedBooks.get(key) === 0) book.blockedBooks.delete(key);
        deadline.setDate(deadline.getDate() - 1);
      }

      await this.booksRepo.update({ _id: bookId }, { $set: { blockedBooks: book.blockedBooks } });
    }
  }

  async adminDenyReturn(id) {
    await this._changeState(id, actionStates.RETURN_DENIED);
  }

  async deleteAction(id) {
    const { deletedCount } = await this.repo.remove({ _id: id });
    if (parseInt(deletedCount, 10) > 1)
      console.error(`Deleted ${deletedCount} actions, because of multiple rows with same id`);
    if (parseInt(deletedCount, 10) === 0) throw new Error('Nothing deleted');
  }
}

module.exports = ActionsService;
