import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  email: String,
  time: String,
  message: String,
});

export default model('Message', MessageSchema);
