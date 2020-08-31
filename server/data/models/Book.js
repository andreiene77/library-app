const { model, Schema } = require('mongoose');

const BookSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publHouse: String,
  year: Number,
  genre: String,
  copies: Number,
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action',
    },
  ],
});

module.exports = model('Book', BookSchema);
