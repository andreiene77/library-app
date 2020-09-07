const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshTokens: [String],
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  phone: String,
  isAdmin: Boolean,
  blocked: Boolean,
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
});

module.exports = model('User', UserSchema);
