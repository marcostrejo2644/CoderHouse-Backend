import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  product: String,
  price: Number,
  thumbnail: String,
});

export default model('Product', productSchema);
