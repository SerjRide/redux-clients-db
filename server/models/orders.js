import mongoose, { Schema } from 'mongoose';

const OrdersSchema = new Schema({
  namber: Number,
  customer: String,
  date: String,
  name: String,
  contacts: String,
  product: [],
  price: Number
});

// date: {type: Date, required:true },
const Orders = mongoose.model('Orders', OrdersSchema);

export default Orders;
