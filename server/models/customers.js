import mongoose, { Schema } from 'mongoose';

const CustomersSchema = new Schema({
  customer: String,
  total_amount: Number,
  true_amount: Number,
  date: [],
  last_date: String,
  day_ago: Number,
  orders_count: Number,
  RFM: String
});

const Customers = mongoose.model('Customers', CustomersSchema);

export default Customers;
