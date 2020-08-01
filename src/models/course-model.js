import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
  name: { type: String },
  description: { type: String }
});

export default mongoose.model('course', courseSchema, 'course');
