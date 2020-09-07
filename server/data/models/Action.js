const { model, Schema } = require('mongoose');
const actionStates = require('../../../utils/actionState');

const ActionSchema = new Schema({
  createDate: { type: Date, required: true },
  lastUpdate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  state: { type: String, required: true, enum: Object.values(actionStates) },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
});

module.exports = model('Action', ActionSchema);
