const { Schema, model } = require('mongoose');

const ProofSchema = new Schema({
  reviewed: {
    type: Boolean,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
  text: String,
  image: String,
  action: {
    type: Schema.Types.ObjectId,
    ref: 'Action',
  },
});

module.exports = model('Proof', ProofSchema);
