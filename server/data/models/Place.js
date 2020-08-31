const { model, Schema } = require('mongoose');

const PlaceSchema = new Schema({
  room: String,
  drawer: String,
  row: String,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

module.exports = model('Place', PlaceSchema);
