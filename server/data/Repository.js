/* eslint-disable no-unused-vars */
const { Model } = require('mongoose');

class Repository {
  /**
   *Creates an instance of Repository.
   * @param {Model} model
   * @memberof Repository
   */
  constructor(model) {
    this.model = model;
  }

  save(doc) {
    return this.model.create(doc);
  }

  saveMany(docs) {
    return this.model.insertMany(docs);
  }

  getOne(filter) {
    return this.model.findOne(filter);
  }

  getMany(filter) {
    return this.model.find(filter);
  }

  getAll() {
    return this.model.find({});
  }

  remove(filter) {
    return this.model.deleteOne(filter);
  }

  update(filter, doc) {
    return this.model.updateOne(filter, doc);
  }
}

module.exports = Repository;
