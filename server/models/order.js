import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  namber: Number,
  customer: String,
  date: String,
  name: String,
  contacts: String,
  product: [],
  price: Number
});

// date: {type: Date, required:true },
const Order = mongoose.model('Order', OrderSchema);

export default Order;
