import mongoose from 'mongoose';
import '../models/order';
import config from '../../etc/config.json';

const Order = mongoose.model('Order');

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost:27017/orders`,
                    {useNewUrlParser: true } )
}

export function getAllOrders() {
  return Order.find();
}

export function createOrder(data) {
  const order = new Order({
    name: data.name,
    adress: data.adress,
    date: data.date,
    product: data.product,
    price: data.price
  });
  return order.save();
}

export function deleteOrder(data) {
  return Order.findById(id).remove();
};
