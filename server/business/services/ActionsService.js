/* eslint-disable no-unused-vars */
const { Types } = require('mongoose');
const Repository = require('../../data/Repository');
const actionStates = require('../../../utils/actionState');

class ActionsService {
  /**
   *Creates an instance of BooksService.
   * @param {Repository} repo
   * @param {Repository} usersRepo
   * @memberof BooksService
   */
  constructor(repo, usersRepo) {
    this.repo = repo;
    this.usersRepo = usersRepo;
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

  async saveAction({ userId, bookId, username }) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    console.log('action deadline', deadline);
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
    return action;
  }

  async updateAction({ _id, createDate, lastUpdate, deadline, state, userId, user, bookId, book }) {
    const { nModified } = await this.repo.update(
      { _id },
      {
        createDate,
        lastUpdate,
        deadline,
        state,
        // user: new Types.ObjectId(userId || user),
        // book: new Types.ObjectId(bookId || book),
      },
    );
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async cancelBooking(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.CANCELED_BY_USER });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async userPickUp(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.BORROWED_AWAITING });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async adminConfirmBorrow(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.BORROWED_CONFIRMED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async userRequestExtend(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.BORROW_EXTEND_REQUEST });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async userRequestAccepted(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.BORROW_EXTEND_ACCEPTED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async userRequestDeclined(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.BORROW_EXTEND_DECLINED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async userReturned(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.USER_RETURNED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async adminConfirmReturn(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.RETURN_CONFIRMED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async adminDenyReturn(id) {
    const { nModified } = await this.repo.update({ _id: id }, { state: actionStates.RETURN_DENIED });
    if (parseInt(nModified, 10) > 1)
      console.error(`Updated ${nModified} actions, because of multiple rows with same id`);
    if (parseInt(nModified, 10) === 0) throw new Error('Nothing modified');
  }

  async deleteAction(id) {
    const { deletedCount } = await this.repo.remove({ _id: id });
    if (parseInt(deletedCount, 10) > 1)
      console.error(`Deleted ${deletedCount} actions, because of multiple rows with same id`);
    if (parseInt(deletedCount, 10) === 0) throw new Error('Nothing deleted');
  }
}

module.exports = ActionsService;
