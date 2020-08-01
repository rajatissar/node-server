import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true },
  username: { type: String },
  password: { type: String, required: true },
  verify: { type: Boolean, default: false }
});

export default mongoose.model('user', userSchema, 'user');
