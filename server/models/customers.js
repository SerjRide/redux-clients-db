import mongoose, { Schema } from 'mongoose';

const CustomersSchema = new Schema({
  customer: String,
  total_amount: Number,
  dates: []
});

const Customers = mongoose.model('Customers', CustomersSchema);

export default Customers;
