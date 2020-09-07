const { model, Schema } = require('mongoose');
const rooms = Object.values(require('../../../utils/rooms'));

const BookSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  publHouse: String,
  year: Number,
  genre: String,
  copies: Number,
  place: {
    room: { type: String, enum: rooms.map((r) => r.name), required: true },
    drawer: { type: String, required: true },
    row: { type: Number, required: true },
  },
  blockedBooks: {
    type: Map,
    of: Number,
  },
});

module.exports = model('Book', BookSchema);
